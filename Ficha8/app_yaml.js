/**
 * @swagger
 * /persons{id}:
 *      delete:
 *          tags:
 *              - Persons
 *              summary: Deletes a person
 *              description: Returns the id of the created person
 *              produces:
 *                  - application/json
 *              parameters:
 *                  - name: Model
 *                  description: Sample persons
 *                  in: body
 *                  required: true
 *                  schema:
 *                      $ref:"#/definitions/Persons"
 *              responses:
 *                  200:
 *                      description: Successfully deleted 
 */