
module.exports= (sequelize, type)=>{
    return sequelize.define("Person", {
        firstName: {
            type: type.STRING,
            allowNull: false
        },
        lastName: {
            type: type.STRING
        },
        profession: {
            type: type.STRING
        },
        age: {
            type: type.INTEGER
        }
    });
}


