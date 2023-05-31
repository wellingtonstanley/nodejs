const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
//const router = express.Router();
const db = require('./database/dbconfig')
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

console.log(process.env.NODE_ENV)

const path = require('path');
//const favicon = require('serve-favicon');
//const logger = require('morgan');
//const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');

// view engine setup
/*app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(cookieParser());
//app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Rotas
const locationRoute = require('./routes/locationRoute');

app.get("/", (req, res) => {
  res.json({ message: "Hello World." });
});
app.use('/mapas', locationRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
/* will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
*/
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
