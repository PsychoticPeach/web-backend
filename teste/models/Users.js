module.exports= (sequelize, type)=>{
    return sequelize.define("Users", {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        password:type.STRING,
        email:type.STRING
    });
}