// Importar Express
const { response } = require('express');
const express = require('express');

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

var mysql = require("mysql");

var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ficha7"
});


app.get("/persons", (request, response) => {
    dbConnection.query("select * from persons", (error, results, fields) => {
        if (error) {
            response.status(404);
            response.end(error.message);
        }
        response.send(results);
    })
});

app.post("/persons", (request, response) => {
    var details = request.body;
    dbConnection.query("insert into persons set ?", [details], (error, results, fields) => {
        if (error) {
            response.status(404);
            response.end(error.message);
        }
        response.send("Inserted ID is: " + results.insertId);
    });
});

app.delete("/persons", (request, response) => {
    var id = request.body.id;
    dbConnection.query("delete from persons where id =" + id, (error, results, fields) => {
        if (error) {
            response.status(404);
            response.end(error.message);
        }
        response.send("Deleted " + results.affectedRows + " entry(s)");
    });
});

app.get("/persons/:id", (request, response) => {
    var id = request.params.id;

    dbConnection.query("select * from persons where id =" + id, (error, results, fields) => {
        if (error) {
            response.status(404);
            response.end(error.message);
        }
        response.send(results);

        if (results.length == 0) {
            response.status(404);
            response.end("ID not found!")
        } else {
            response.send(results);
        }
    });
});

app.get("/persons/:age/:profession", (request, response) => {
    var age = request.params.age;
    var profession = request.params.profession;

    dbConnection.query("select * from persons where age=? and profession=? ", [age, profession], (error, results, fields) => {
        if (error) {
            response.status(404);
            response.end(error.message);
        }
        response.send(results);

        if (results.length == 0) {
            response.status(404);
            response.end("User not found!")
        } else {
            response.send(results);
        }
    });
});

app.put("/persons/:id", (request, response) => {
    var id = request.params.id;
    var details = request.body;

    dbConnection.query("update persons set? where id =?", [details, id], (error, results, fields) => {
        if (error) {
            response.status(404);
            response.end(error.message);
        }
        response.send(results);

        if (results.length == 0) {
            response.status(404);
            response.end("ID not found!")
        } else {
            details.id = id;
            response.send(details);
        }
    });
});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});