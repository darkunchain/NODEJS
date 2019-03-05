//variables y constantes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const raiz = __dirname;


//settings
let portdb = 9704;
app.set('port', 3000);
app.set('views', path.join(raiz,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//routes
app.use(require('./routes/routes.js'));

//static files

app.use(express.static(path.join(raiz, 'public')));


//listening
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
  console.log('engine', path.join(raiz,'views'));
})
