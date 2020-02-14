// Este es mi servidor
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json');


const app = express();

// connection to db
mongoose.connect('mongodb://localhost/MDA')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes');

// settings
app.set('port', process.env.PORT || 8090);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
  res.header('Access-Control-Max-Age', '3600');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requests');
  next();
});


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
