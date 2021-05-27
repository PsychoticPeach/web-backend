module.exports = (sequelize, type) =>{
    return sequelize.define("Products", {
        name:{
            type:type.STRING,
            allowNull:false
        },
        price:{
            type: type.INTEGER
        },
        description:{
            type: type.STRING
        },
        brand:{
            type: type.STRING
        }
    });
}