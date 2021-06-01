const Users = require("../sequelize").Users;

exports.getUsers = (req,res,next)=>{
    Users.findAll()
    .then(result=>{
        res.json(result);
    });
}

exports.getTest = (req,res,next)=>{
    res.send("TEST");
}

exports.deletUsers = (req,res,next)=>{
    var id = req.params.id;
    Users.findOne({
        where:{
            id:id
        }
    })
    .then(result=>{
        result.destroy(result)
    }).catch(err => {
        res.send(err);
    })
}