const express = require('express');
const path = require('path');
const app = express();
const mssql = require('mssql');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var config = {
user: 'seguridadune',
password: 'regis4620*',
server: '172.20.60.41',
port: 1433,
database: 'faultline',
encrypt: true
};

const customerRoutes = require('./routes/routes');

var connection = mssql.connect(config, function (err, res) {
    if (err) {
        throw err;
    } else {
        console.log('conectado correctamente a la base de datos del servidor');
       
    }
});

app.use('/', customerRoutes);
//run server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//static Files
app.use(express.static(path.join(__dirname, 'public')));


