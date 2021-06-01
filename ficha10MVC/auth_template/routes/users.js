var express = require("express");
var router = express.Router();

var usersController = require("../controllers/usersController");

router.use(isLoggedIn);

router.get("/", usersController.getUsers);//vai buscar o userControllers o module getUsers

router.get("/test", usersController.getTest);

router.delete("/:id", usersController.deletUsers);

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't, redirect them to the home page
    res.redirect('/');
}

module.exports = router; // faz export do router para poder ser usado na app.js