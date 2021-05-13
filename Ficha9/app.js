// Importar Express
const { response } = require('express');
const express = require('express');

//Importar mysql
const mysql = require("mysql2");

//Imortar sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize("ficha9", "root", "", {
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(error => {
        console.error("Unable to connect", error);
    });


const Person = sequelize.define("Person", {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
    },
    profession: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    }
});

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
    }).then(() => {
        return Person.findAll();
    }).then((person) => {
        console.log(person);
    });


// Person.bulkCreate([
//     { firstName: "Pedro", lastName: "Jardim", profession: "IT", age: 62 },
//     { firstName: "Manuel", lastName: "Matos", profession: "IT", age: 62 },
//     { firstName: "Maria", lastName: "Figueira", profession: "IT", age: 62 },
//     { firstName: "Ana", lastName: "Duarte", profession: "IT", age: 62 },
//     { firstName: "Luis", lastName: "Faria", profession: "IT", age: 62 },
// ]).then(() => {
//     return Person.findAll();
// }).then((person) => {
//     console.log(person)
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



app.get("/persons", (request, response) => {
    Person.findAll().then(person => {
        console.log("All persons:", JSON.stringify(person, null, 4));
    });
});

app.post("/persons", (request, response) => {
    Person.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
        console.log("Jane's auto generated ID:", jane.id);
    });
});

app.delete("/persons", (request, response) => {
    var id = request.body.id;
    Person.destroy({
        where: {
            id: id
        }
    }).then(() => {
        console.log("Done")
    });
});

app.delete("/persons/:id", (request, response) => {
    var id = request.params.id;
    Person.destroy({
        where: {
            id: id
        }
    }).then(() => {
        console.log("Done")
    });
});

app.get("/persons/:id", (request, response) => {
    var id = request.params.id
    Person.findOne({
        where: {
            id: id
        }
    }).then(person => {
        console.log("All persons:", JSON.stringify(person, null, 4));
    });
});

app.get("/persons/:age/:profession", (request, response) => {
    var age = request.params.age;
    var profession = request.params.profession;
    Person.findOne({
        where: {
            age: age,
            profession: profession
        }
    }).then((person) => {
        console.log("person:", JSON.stringify(person));
    });

});

app.put("/persons/:id", (request, response) => {
    var id = request.params.id;
    var { firstName, lastName, profession, age } = request.body;

    Person.update({ firstName, lastName, profession, age }, {
        where: {
            id: id
        }
    }).then((person) => {
        console.log("person:", JSON.stringify(person));
    })
});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});