// Importar Express
const { response } = require('express');
const express = require('express');

//Importar mysql
const mysql = require("mysql2");

//Imortar sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize("projeto1", "root", "", {
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(error => {
        console.error("Unable to connect", error);
    });


const Product = sequelize.define("Product", {
    seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL
    },
    url:{
        type:Sequelize.INTEGER
    },
    views:{
        type:Sequelize.INTEGER
    },
    images:{
        type:Sequelize.JSON
    },
    comments:{
        type:Sequelize.JSON
    },
    tags:{
        type:Sequelize.JSON
    }
});
    
sequelize.sync({ force: false })
.then(() => {
    console.log("Database & tables created!");
})//.then(() => {
//     return Person.findAll();
// }).then((person) => {
//     console.log(person);
// });


//Importar o swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


// Instanciar o express
const app = express();
// Definir a porta do servidor HTTP
const port = 3000;

//middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/product", req, res =>{
    Product.findAll()
})

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});