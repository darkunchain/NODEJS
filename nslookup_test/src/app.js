const path = require('path');
const express = require('express');
//const morgan = require('morgan');
const app = express();
const nslookup = require('nslookup');


// importing routes
const indexRoutes = require('./routes/index');



app.use(express.static(path.join(__dirname, 'public')));

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
//app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});



