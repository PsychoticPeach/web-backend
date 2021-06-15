var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController.js");
const { dbtoken } = require("../config.js");
var jwt = require('jsonwebtoken');
/* GET users listing. */
//router.use(authenticateTokenFromHeaders);   

router.get('/', userController.getUsers);

router.post("/", userController.createUser);

router.delete("/:id", userController.deleteUser);

router.get("/:id", userController.getId);

router.put("/users/:id",userController.updateId)

function authenticateTokenFromHeaders(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
    jwt.verify(token, dbtoken, (err, user) =>{
      if(err)
        return res.sendStatus(403);
      req.user = user;
      next();
    });
}

module.exports = router;
