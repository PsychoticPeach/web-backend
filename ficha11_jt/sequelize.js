//Implement all the models and business logic using sequelize

const Sequelize = require("sequelize");
const { dbschema, dbuser, dbpass, dbhost } = require("./config");
const UsersModel = require("./models/Users")

const sequelize = new Sequelize(dbschema,dbuser, dbpass, {
    host:dbhost,
    dialect: "mysql",
    pool:{
        max:10,
        min:0,
        acquire:30000,
        idle:10000
    }
});

const Users = UsersModel(sequelize, Sequelize);

//Autenticação à BD
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(error => {
        console.error("Unable to connect", error);
});

sequelize.sync({ force: false })
    .then(() => {
        console.log("tables created!");
    })

module.exports={
    Users
}