// Este es mi servidor
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json');
const fileUpload = require('express-fileupload');



const app = express();

// connection to db
mongoose.connect('mongodb://localhost/MDA', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(db => console.log('Conectado a la base de datos MongoDB'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/indexRoutes');
const jsonRoutes = require('./routes/jsonRoutes');

// settings
app.set('port', process.env.PORT || 8090);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
/* app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
  res.header('Access-Control-Max-Age', '3600');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requests');
  next();
}); */


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
// routes

app.use('/', indexRoutes);
app.use(require('./routes/mongoRoutes'))
app.use('/json', jsonRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
