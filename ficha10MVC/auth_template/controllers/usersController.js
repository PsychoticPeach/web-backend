const Users = require("../sequelize").Users;

exports.getUsers = (req,res,next)=>{
    Users.findAll()
    .then(result=>{
        res.render("person", {title: "Person", test:"THIS IS A TEST", data: result});
    });
}