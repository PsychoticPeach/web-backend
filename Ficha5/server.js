// Importar Express
const express = require('express')

const fs = require("fs")

//função para ler um ficheiro ou caminho passado como argumento, de forma assíncrona
function readFileSunc(path) {
    var content = fs.readFileSync(path);
    return content;
}

// Instanciar o express
const app = express();

// Definir a porta do servidor HTTP
const port = 3000;

//default .get endpoint
app.get('/', (req, res) => {
    res.send('Hello Postman!');
});

//list all persons endpoint
app.get('/users', (req, res) => {
    var persons = readFileSunc("./persons.json");
    res.send(JSON.parse(persons));
});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});