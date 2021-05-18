// Importar Express
const { response } = require('express');
const express = require('express');
const { fileURLToPath } = require('url');

//Importar mysql
const mysql = require("mysql2");

//Imortar sequelize
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
//     { seller_id: 2, title: "KeyBoard", description: "Razer Huntsman V2", price: 250, url: "", views: 7458, comments: { "Person6": "Can't wait to get mine!" }, tags: {tags:["benfica", "Technology"]} },
//     { seller_id: 2, title: "SmartBand", description: "Xiaomi miband 6", price: 40, url: "", views: 2042, comments: { "Person4": "Good price for a good band" }, tags: ["porto", "Technology"] },
// ])


sequelize.sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
    }) //.then(() => {
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
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//PARTE A
//Ex a. FEITO
// app.get("/product", (req, res) => {
//     Product.findAll().then(product => {
//         console.log("All Products:", JSON.stringify(product));
//         res.send(product);
//     });
// });


//Ex b. FEITO
// app.post("/product", (req, res) => {
//     var details = req.body;
//     Product.create(details).then((product) => {
//         console.log("Auto generated ID:", product.id);
//         res.send(JSON.stringify(product.id));
//     });
// });


//Ex c. FEITO
app.get("/seller", (req, res) => {
    var id = req.query.seller_id
    Product.findAll({
        where: {
            id: id
        }
    }).then(product => {
        console.log("Products from ID:", JSON.stringify(product, null, 4))
        res.send(JSON.stringify(product, null, 4));
    });
});


//Ex d. FEITO
app.put("/product/:id/incrementViews", (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(product => {
        product.increment("views");
        product.reload();        
        res.send({"views": product.views});
    }).catch(error =>{
        res.send({"error": error});
    });
});


//Ex e. COMO PESQUISAR POR TAGS  http://localhost:3000/product/tags?tags[]=Technology
app.get("/product/tags", (req, res) => {
    var tagsArray = req.query.tags;
    Product.findAll({}).then(products => {
        for (let i = 0; i < tagsArray.length; i++) {
            console.log(products[i]);
        }
        console.log("Products with same tags:", product);
        var tags = JSON.parse(product.tags);
        res.send(product);
    }).catch(error =>{
        res.send({"error": error});
    });
});


//PARTE B
//Ex a. FEITO
app.get("/product/id", (req, res) => {
    var id = req.query.id
    Product.findOne({
        where: {
            id: id
        }
    }).then(product => {
        console.log("All Products:", JSON.stringify(product));
        res.send(product);
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
    }).catch(error =>{
        res.status(404);
        res.end(error.message);
    });
});

//Ex c. DONE
app.put("/product/:id/images", (req, res) => {
    var imagem = req.body;
    Product.update(imagem,{
        where: {
            id: req.params.id
        }
    }).then(() => {
        console.log(imagem)
        res.send(imagem);
    }).catch(error =>{
        res.send({"error": error});
    });
});


// Ex d. DONE
app.put("/product/:id/comments", (req, res) => {
    var comment = req.body;
    Product.update(comment, {
        where: {
            id: req.params.id
        }
    }).then((comment) => {
        console.log("Updated.", "id:", id, comment)
        res.send(JSON.stringify(comment));
    }).catch(error =>{
        res.send({"error": error});
    });
});


//Ex e. DONE
app.get("/product/views", (req, res) => {
    Product.findAll({
        order: [["views", "DESC"]]
    }).then(product => {
        console.log("All Products:", JSON.stringify(product));
        res.send(product);
    });
});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});