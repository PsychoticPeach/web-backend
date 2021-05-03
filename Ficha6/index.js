// Importar Express
const express = require('express');
// require para o file system (manipula ficheiros em node.js)
const fs = require("fs");
const { fileURLToPath } = require('url');

// Instanciar o express
const app = express();
// Definir a porta do servidor HTTP
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware function
app.use(function log(request, response, next) {
    fs.appendFileSync("./log.txt", request.path + ", " + request.method + ", " + new Date + "\n");
    next();
});

//default .get endpoint
app.get('/', (request, response) => {

    var body = fs.readFileSync("./index.html", "utf-8");
    var date = new Date();
    body = body.replace("{date}", date.toLocaleDateString());
    body = body.replace("{hour}", date.toLocaleTimeString());

    response.writeHead(200, {
        "Content-Length": Buffer.byteLength(body),
        "Content-Type": "text/html"
    });
    response.end(body);
});

//@name: route parameter
app.get('/user/:name', (request, response) => {
    var body = fs.readFileSync("./index.html", "utf-8");
    var name = request.params.name;
    body = body.replace("{user}", name);

    response.writeHead(200, {
        "Content-Length": Buffer.byteLength(body),
        "Content-Type": "text/html"
    });
    response.end(body);
});

//@name: query parameter
app.get('/user', (request, response) => {
    var body = fs.readFileSync("./index.html", "utf-8");
    var date = new Date();
    var name = request.query.name;
    var profession = request.query.profession;
    body = body.replace("{user}", name);
    body = body.replace("{profession}", profession);
    body = body.replace("{date}", date.toLocaleDateString());
    body = body.replace("{hour}", date.toLocaleTimeString());

    response.writeHead(200, {
        "Content-Length": Buffer.byteLength(body),
        "Content-Type": "text/html"
    });
    response.end(body);
});

app.get("/log", (request, response) => {
    var body = fs.readFileSync("./log.txt", "utf-8");

    response.writeHead(200, {
        "Content-Length": Buffer.byteLength(body),
        "Content-Type": "text/plain"
    });
    response.end(body);
});

app.get("/log.txt", (request, response) => {
    response.download("./log.txt", function(err) {
        if (err) {
            response.status(404);
            response.end("Ocorreu um erro ao ler o ficheiro. " + err.message);
        } else {

        }
    })
});

app.get("/clear", (request, response) => {
    fs.unlink("./log.txt", function name(err) {
        if (err) {
            response.status(404);
            response.end("Ocorreu um erro ao apagar o ficheiro. " + err.message);
        } else {
            response.send("File deleted");
        }
    });

    // fs.unlinkSync("./log.txt");
    // response.send("File deleted");
});

// método que arranca o servidor http e fica à escuta
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

    fs.open("log.txt", "a", (err, fd) => {
        console.log("File was Created " + fd);
    });
});