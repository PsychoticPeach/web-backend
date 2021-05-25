const Person = require("../sequelize").Person;

exports.getPersons = (req,res,next)=>{
    Person.findAll()
    .then(result=>{
        res.render("person", {title: "Person", test:"THIS IS A TEST", data: result});
    });
}