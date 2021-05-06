// Importar Express
const { response } = require('express');
const express = require('express');

//Importar o swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            version: "1.0.0",
            title: "Ficha 7 API",
            description: "Ficha 7 API Information",
            contact: {
                name: "TPSI-DWB"
            },
            servers: ["http://localhost:3000"]
        },
        definitions: {
            "Persons": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "x-primary-key": true
                    },
                    "firstname": {
                        "type": "string"
                    },
                    "lastname": {
                        "type": "string"
                    },
                    "profession": {
                        "type": "string"
                    },
                    "age": {
                        "type": "integer",
                        "format": "int64"
                    }
                }
            }
        }
    },
    apis: ["app.js"]
};

// Instanciar o express
const app = express();
// Definir a porta do servidor HTTP
const port = 3000;

//middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

var mysql = require("mysql");

var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ficha7"
});

/**
 * @swagger
 * /persons:
 *      get:
 *          tags:
 *              - Persons
 *          summary: Gets a list os persons
 *          description: Returns a list of persons
 *          produces:
 *              -application/json
 *          responses:
 *              200:
 *                  description: An array of persons
 *                  schema:
 *                      $ref: "#/definitions/Persons"
 */
app.get("/persons", (request, response) => {
    dbConnection.query("select * from persons", (error, results, fields) => {
        if (error) {
            response.status(404);
            response.end(error.message);
        }
        response.send(results);
    })
});

/**
 * @swagger
 * /persons:
 *      post:
 *          tags:
 *              - Persons
 *          summary: Creates and stores a person
 *          description: Returns the id of the created person
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: Model
 *                description: Sample person
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: "#/definitions/Persons"
 *          responses:
 *              200:
 *                  description: Successfully created
 */
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

/**
 * @swagger
 * /persons:
 *      delete:
 *          tags:
 *              - Persons
 *          summary: Deletes a person
 *          description: Returns the id of the deleted person
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: Delete a person
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: "#/definitions/Persons"
 *          responses:
 *              200:
 *                  description: Successfully deleted
 */
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


/**
 * @swagger
 * /persons/{id}:
 *      get:
 *          tags:
 *              - Persons
 *          summary: Select a person by id
 *          description: Returns a person by its id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: Fetch Person
 *                in: path
 *                required: true
 *                type: string
 *                schema:
 *                  $ref: "#/definitions/Persons"
 *          responses:
 *              200:
 *                  description: Successful operation
 *              400:
 *                  description: Unsuccessful request, try again
 *              404:
 *                  description: User not found
 */
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

/**
 * @swagger
 * /persons/{age}/{profession}:
 *      get:
 *          tags:
 *              - Persons
 *          summary: Select a person by age and profession
 *          description: Returns a person by its age and profession
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: age
 *                description: Insert age to fetch
 *                in: path
 *                required: true
 *                type: string
 *              - name: profession
 *                description: Insert profession to fetch
 *                in: path
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                  description: Successful operation
 *              400:
 *                  description: Unsuccessful request, try again
 *              404:
 *                  description: User not found
 */
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

/**
 * @swagger
 * /persons/{id}:
 *      put:
 *          tags:
 *              - Persons
 *          summary: Updates a person by id
 *          description: Returns the person updated
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: Insert id to update
 *                in: path
 *                required: true
 *                type: string
 *                schema:
 *                  $ref: "#/definitions/Persons"
 *              - name: Model
 *                description: Sample person
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: "#/definitions/Persons"
 *          responses:
 *              200:
 *                  description: Successful operation
 *              400:
 *                  description: Unsuccessful request, try again
 *              404:
 *                  description: User not found
 */
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