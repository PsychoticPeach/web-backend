var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();


app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(session({ secret: 'cat', cookie: { maxAge: 60000 } })); // Use the session middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(testMiddleware);

// default routes ======================================================================
require('./controllers/passportController')(passport); // pass passport for configuration
require('./routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport

// TODO Add custom routes ======================================================================

var userRouter = require("./routes/users.js"); //carregar a rota users para usar em routes/user.js
app.use("/users", userRouter);

// express server
var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});

function testMiddleware(req, res, next) {
    console.log("TESTE MIDDLEWARE");
    return next();
}