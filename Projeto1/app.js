// Importar Express
const { response } = require('express');
const express = require('express');
const { fileURLToPath } = require('url');

//Importar mysql
const mysql = require("mysql2");

//Imortar sequelize
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
//     { seller_id: 2, title: "Computer", description: "ChromeBook", price: 569, url: "", views: 9203, comments: { "Person2": "Love it!" } },
//     { seller_id: 2, title: "KeyBoard", description: "Razer Huntsman V2", price: 250, url: "", views: 7458, comments: { "Person6": "Can't wait to get mine!" } },
//     { seller_id: 2, title: "SmartBand", description: "Xiaomi miband 6", price: 40, url: "", views: 2042, comments: { "Person4": "Good price for a good band" } },
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
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get("/product", (req, res) => {
//     Product.findAll().then(product => {
//         console.log("All Products:", JSON.stringify(product));
//         res.send(product);
//     });
// });

app.post("/product", (req, res) => {
    var details = req.body;
    Product.create(details).then((product) => {
        console.log("Auto generated ID:", product.id);
        res.send(JSON.stringify(product.id));
    });
});

app.get("/product", (req, res) => {
    var seller_id = req.query.seller_id;
    Product.findAll({
        where: {
            seller_id: seller_id
        }
    }).then(product => {
        console.log("All products:", JSON.stringify(product, null, 4))
        res.send(JSON.stringify(product, null, 4));
    });
});

app.put("/product/:id", (req, res) => {
    var id = req.params.id;
    Product.update(Product.views++, {
        where: {
            id: id
        }
    }).then(() => {
        console.log("Updated.", "id:", id, Product.views);
        res.send(JSON.stringify());
    })

});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});