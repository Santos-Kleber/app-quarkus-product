//Importa as dependências que acabamos de instalar
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Acrescentando cabecalho para resolver problema de CORS
//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "https://app-angular-product.herokuapp.com/");
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//  next();
//});

app.use(cors({origin: '*',
              allowedHeaders: ['sessionId', 'Content-Type'],
              methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + "/dist/angular-http"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/angular-http/index.html"));
});

// Inicia a aplicação pela porta configurada
app.listen(process.env.PORT || 8080);
