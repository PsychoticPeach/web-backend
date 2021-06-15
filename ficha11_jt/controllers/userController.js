const Users = require("../sequelize").Users;

exports.getUsers = (req,res,next)=>{
    Users.findAll()
    .then(result=>{
        res.json(result);
    });
}

exports.updateId = (req,res,next)=>{
    details = req.body;
    Users.findOne(details,{
        where:{
            id:req.params.id
        }
    })
    .then(result=>{
        res.json(result);
    });
}

exports.getId = (req,res,next)=>{
    Users.findOne({
        where:{
            id:req.params.id
        }
    })
    .then(result=>{
        res.json(result);
    });
}

exports.createUser = (req,res,next)=>{
    var details = req.body;
    Users.create(details).then((user) => {
        if(details == null) {
            res.status(404);
            res.end("ID Not Found")
        } else {
            console.log("Auto generated ID:", user.id);
            res.status(200).send({ "Auto generated ID:": user.id });
        }
    }).catch(error => {
        res.send({ "error": error });
    });
}

exports.deleteUser = (req,res,next)=>{
    var id = req.params.id;
    Users.findOne({
        where:{
            id:id
        }
    })
    .then(result=>{
        result.destroy(result)
        res.status(200).send({ "Deleted User: ": result});
    }).catch(err => {
        res.send(err);
    })
}