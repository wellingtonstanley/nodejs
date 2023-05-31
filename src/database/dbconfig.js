const mongoose = require('mongoose');
const url='mongodb://127.0.0.1:27017/geomapas';
//const db = 'geoteste';
//const mongoClient = require("mongodb").MongoClient;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then( function(){
                console.log(`Mongo conectado a ${url}`)
                var db = mongoose.connection;
            })
            .catch(err => console.log(err));


module.exports = { Mongoose: mongoose }
