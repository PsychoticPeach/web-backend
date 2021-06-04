var express = require('express');
var router = express.Router();
var indexController = require("../controllers/indexController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login.ejs',{ message:req.flash("loginMessage")}); // load the index.ejs file
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs',{ message:req.flash("signupMessage")}); // load the signup.ejs file
});

router.get('/profile', isLoggedIn ,function(req, res) {
  res.render('profile.ejs',{ user:req.user }); // load the profile.ejs file
});

router.get('/logout', (req,res)=>{
  req.logout();
  res.redirect("/");
});

router.post("/login", indexController.login);
router.post("/signup", indexController.signup);
module.exports = router;
