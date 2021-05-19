// Importar Express
const { response } = require('express');
const express = require('express');
const { fileURLToPath } = require('url');

//Importar mysql
const mysql = require("mysql2");

//Imortar sequelize
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("shop", "root", "", {
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
    url: {
        type: Sequelize.STRING
    },
    views: {
        type: Sequelize.INTEGER
    },
    images: {
        type: Sequelize.JSON
    },
    comments: {
        type: Sequelize.JSON
    },
    tags: {
        type: Sequelize.JSON
    }
});


// Product.bulkCreate([
//     { seller_id: 1, title: "Backpack", description: "Spacious and confortable to wear", price: 29, url: "", views: 31683, comments: { "Person3": "great backpack" } },
//     { seller_id: 1, title: "Jacket", description: "Nice and warm", price: 37, url: "", views: 20948, comments: { "person": "Best Jacket" } },
//     { seller_id: 1, title: "Chair", description: "Lumbar Support, Confortable", price: 127, url: "", views: 1790, comments: { "person5": "So nice and confy" } },
//     { seller_id: 2, title: "Computer", description: "ChromeBook", price: 569, url: "", views: 9203, comments: { "Person2": "Love it!" }, tags: ["tags", "Technology"] },
//     { seller_id: 2, title: "KeyBoard", description: "Razer Huntsman V2", price: 250, url: "", views: 7458, comments: { "Person6": "Can't wait to get mine!" }, tags: { tags: ["benfica", "Technology"] } },
//     { seller_id: 2, title: "SmartBand", description: "Xiaomi miband 6", price: 40, url: "", views: 2042, comments: { "Person4": "Good price for a good band" }, tags: ["porto", "Technology"] },
// ])


sequelize.sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
    })

//Importar o swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


// Instanciar o express
const app = express();
// Definir a porta do servidor HTTP
const port = 3000;

//middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/project-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//PARTE A
//Ex a. FEITO INCLUINDO ERROS
app.get("/product", (req, res) => {
    Product.findAll().then(product => {
        if (product.length == 0) {
            res.status(404);
            res.end("ID not found!")
        } else {
            console.log("200", product);
            res.status("200").send(product);
        }
    }).catch(error => {
        res.status(404);
        res.end(error.message);
    });
});


//Ex b. FEITO INCLUINDO ERROS
app.post("/product", (req, res) => {
    var details = req.body;
    Product.create(details).then((product) => {
        if (details == null) {
            res.status(404);
            res.end("ID not found!")
        } else {
            console.log("Auto generated ID:", product.id);
            res.sendStatus(200);
        }
    }).catch(error => {
        res.send({ "error": error });
    });

});


//Ex c. FEITO INCLUINDO ERROS
app.get("/seller", (req, res) => {
    Product.findAll({
        where: {
            seller_id: req.query.seller_id
        }
    }).then(product => {
        if (product) {
            res.status(404);
            res.end("ID not found");
        } else {
            console.log("Products from seller_id:", product)
            res.status(200).send(product);
        }
    }).catch(error => {
        if (req.query.seller_id == undefined) {
            res.status(400);
            res.end("ID not Inserted");
        } else {
            response.end(error.message);
        }
    });
});


//Ex d. FEITO INCLUINDO ERROS
app.put("/product/:id/incrementViews", (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        }
    }).then(product => {
        if (!product) {
            res.status(404);
            res.end("ID not found");
        } else {
            product.increment("views");
            product.reload();
            res.send({ "views": product.views });

        }
    }).catch(error => {
        res.send({ "error": error });
    });
});


//Ex e. Só funciona com 1 tag FALTA ERROS
app.get("/product/tags", (req, res) => {
    var tagsArray = req.query.tags;
    for (let i = 0; i < tagsArray.length; i++) {
        sequelize.query("SELECT * FROM `products` WHERE `products`.`tags`=?", {
                replacements: [tagsArray[i]],
                type: QueryTypes.SELECT
            })
            .then((product) => {
                if (product) {
                    console.log("Product with tag:", tagsArray[i])
                    console.log(product)
                    res.status(200).send(product)
                } else {
                    res.status(404).send("Not Found!")
                }
            }).catch(error => {
                res.send({ "error": error });
            })
    }
});


//PARTE B
//Ex a. FEITO INCLUINDO ERROS
app.get("/product/id", (req, res) => {
    var id = req.query.id
    Product.findOne({
        where: {
            id: id
        }
    }).then(product => {
        if (product) {
            console.log("All Products:", product);
            res.status(200).send(product);
        } else {
            res.status(404);
            res.end("ID not found!");
            console.log("ID not found!");
        }
    }).catch(error => {
        res.send({ "error": error });
    });
});


//Ex b. FEITO INCLUINDO ERROS
app.delete("/product/:title", (req, res) => {
    var title = req.params.title;
    Product.findOne({
        where: {
            title: title
        }
    }).then((product) => {
        product.destroy(product);
        console.log("200", product);
        res.send("200", product);

    }).catch(error => {
        res.status(404);
        res.end(error.message);
    });
});

//Ex c. DONE INCLUINDO ERROS
app.put("/product/:id/images", (req, res) => {
    var imagem = req.body;
    Product.update(imagem, {
        where: {
            id: req.params.id
        }
    }).then((product) => {
        if (product == 0) {
            console.log("Not Found!")
            res.status(404).send({ "ID Not Found:": req.params.id });
        } else {
            console.log(product);
            res.send(imagem);
        }
    }).catch(error => {
        res.send({ "error": error });
    });
});


// Ex d. DONE INCLUINDO ERROS
app.put("/product/:id/comments", (req, res) => {
    var comment = req.body;
    Product.update(comment, {
        where: {
            id: req.params.id
        }
    }).then((comments) => {
        if (comments == 0) {
            console.log("Not Found!")
            res.status(404).send({ "ID Not Found:": req.params.id });
        } else {
            console.log(comments)
            res.send(comments);
        }
    }).catch(error => {
        res.send({ "error": error });
    });
});


//Ex e. DONE INCLUINDO ERROS
app.get("/product/views", (req, res) => {
    Product.findAll({
        order: [
            ["views", "DESC"]
        ]
    }).then(product => {
        if (product == 0) {
            console.log("Not Found!")
            res.status(404).send("No products Found!");
        }
        console.log("All Products:", product);
        res.send(product);
    }).catch(error => {
        res.send({ "error": error });
    });
});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});