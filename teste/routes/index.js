var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();


const Users = require("../models/Users");

function authenticateTokenFromSession(req, res, next) {
    const token = req.session.dbtoken;
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.dbtoken, (error, user) => {
        if (error) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

var indexController = require("../controllers/indexController")

router.post("/login", indexController.login);
router.post("/signup", indexController.signup);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/login", (req, res, next) => {
    res.render("login", { message: req.flash("loginMessage") })
})

router.post("/login", indexController.login);

router.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash("signupMessage") }); // load the signup.ejs file
});

router.post("/signup", indexController.signup);

router.get('/profile', authenticateTokenFromSession, (req, res) => {
    res.render('profile.ejs', { user: req.session.user }); // load the profile.ejs file
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;