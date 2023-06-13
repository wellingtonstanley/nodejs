const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const db = require('./database/dbSqlConfig');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
const hackRoute = require('./routes/hackRoute');

app.get("/", (req, res) => {
  res.json({ message: "Hello World." });
});

//manipula as rotas do client com o path produto
app.use('/produto', hackRoute);

// handler de erros
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
