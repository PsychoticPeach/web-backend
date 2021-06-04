var jwt = require("jsonwebtoken");
const User = require("../sequelize").User;

function generateAccessToken(email, password) {
    return jwt.sign({email, password}, process.env.TOKEN_SECRET, {expiresIn: "18000s"});
}

exports.signup = function(req,res){
    var {email} = req.body;
    var {password} = req.body;

    User.findOne({
        where:{
            email:email
        }
    }).then( result => {
        if (result == null) {
            User.create({"email":email,"password":password})
                .then(user=>{
                    var token = generateAccessToken(email,password);
                    req.session.user = user;
                    req.session.token = token;
                    res.redirect("/profile");
                });
        } else {
            req.flash("signupMessage", "That e-mail is already taken.");
            res.redirect("/signup");
        }
    })
}

exports.login = function(req,res){
    var {email} = req.body;
    var {password} = req.body;

    User.findOne({
        where:{
            email:email
        }
    }).then( user => {
        if (user == null) {
            req.flash("loginMessage", "No user found with that e-mail.")
            req.redirect("/login");
        } else if (user.password != password){
            req.flash("loginMessage", "Oops! wrong Password.");
            res.redirect("/login");
        } else {
            const token = generateAccessToken(email, password);
            req.session.user = user;
            req.session.token = token;
            res.cookie("access_token",token,{
                expires: new Date(Date.now()+8*3600000)
            })
        }
    })
}