const { response } = require("express");

/**
 * @swagger
 * /person:
 *      get:
 *          tags:
 *              - Person
 *          summary: Gets a list os persons
 *          description: Returns a list of persons
 *          produces:
 *              -application/json
 *          responses:
 *              200:
 *                  description: An array of persons
 *                  schema:
 *                  $ref: "#/definitons/Person"
 */
app.get("/person", (request, response) => {

})

/**
 * @swagger
 * /person:
 *      post:
 *          tags:
 *              - Person
 *              summary: Creates and stores a person
 *              description: Returns the id of the created person
 *              produces:
 *                  - application/json
 *              parameters:
 *                  - name: Model
 *                  description: Sample person
 *                  in: body
 *                  required: true
 *                  schema:
 *                      $ref:"#/definitions/Person"
 *              responses:
 *                  200:
 *                      description: Successfully created 
 */
app.post("/person", (request, response) => {

})