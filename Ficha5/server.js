// Importar Express
const express = require('express');

const fs = require("fs");

// const bodyParser = require("body-parser");

//função para ler um ficheiro ou caminho passado como argumento, de forma assíncrona
function readFileSync(path) {
    var content = fs.readFileSync(path);
    return content;
}

function writeFileSync(path, data) {
    fs.writeFileSync(path, data);
}

// Instanciar o express
const app = express();

// Definir a porta do servidor HTTP
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//default .get endpoint
app.get('/', (req, res) => {
    res.send('Hello Postman!');
});

//list all persons endpoint
app.get('/users', (req, res) => {
    var persons = readFileSync("./persons.json");
    res.send(JSON.parse(persons));
});

app.post("/users", (req, res) => {
    //Le e converte o ficheiro JSON
    var persons = JSON.parse(readFileSync("./persons.json"));
    //Ve o tamanho e incrementa +1 ao id
    var length = Object.keys(persons).length;
    var id = ++length;

    // var age = persons.person2.age;
    // var age = persons["person2"].age;

    // persons.person2.age = 54;
    // persons["person2"].age = 54;

    //adicionamos a nova propriedade à nova pessoa
    var newPerson = req.body;
    newPerson.id = id;
    //atribui o persons+id à newPerson
    persons["person" + id] = newPerson;
    //converte o ficheiro JSON para string
    writeFileSync("./persons.json", JSON.stringify(persons));

    res.send(persons);
});

app.delete("/users", (req, res) => {
    var persons = JSON.parse(readFileSync("./persons.json"));
    var id = req.body.id;

    var person = persons["person" + id];
    if (person != undefined) {
        delete persons["person" + id];
        res.send(persons);
        writeFileSync("./persons.json", JSON.stringify(persons));
    } else {
        res.send("Id Inexistente");
    }
});

app.get("/users/:id", (req, res) => {
    var persons = JSON.parse(readFileSync("./persons.json"));
    var id = req.params.id;

    var person = persons["person" + id];
    if (person != undefined) {
        res.send(person);

    } else {
        res.send("Id Inexistente");
    }
})

app.put("/users/:id", (req, res) => {
    var persons = JSON.parse(readFileSync("./persons.json"));
    var id = req.params.id;
    var person = persons["person" + id];

    if (person != undefined) {
        persons["person" + id] = req.body;
        persons["person" + id].id = id;
        writeFileSync("./persons.json", JSON.stringify(persons));
        res.send(persons);
    } else {
        res.send("Id Inexistente");
    }
})

// app.delete("/users/:id", (req, res) => {
//     var persons = JSON.parse(readFileSync("./persons.json"));
//     var id = req.params.id;

//     var person = persons["person" + id];
//     if (person != undefined) {
//         delete persons["person" + id];
//         res.send(persons);
//         writeFileSync("./persons.json", JSON.stringify(persons));
//     } else {
//         res.send("Id Inexistente");
//     }
// });

// ALT + SHIFT + F <- FORMATA O CÓDIGO

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});