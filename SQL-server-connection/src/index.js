const express = require('express');
const path = require('path');
const app = express();
const mssql = require('mssql');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var config = {
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
server: process.env.DB_HOST || 'localhost',
port: Number(process.env.DB_PORT || 1433),
database: process.env.DB_NAME,
options: {
    encrypt: process.env.DB_ENCRYPT !== 'false',
    trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true'
}
};

const customerRoutes = require('./routes/routes');

mssql.connect(config)
    .then(() => {
        console.log('conectado correctamente a la base de datos del servidor');
        app.use('/', customerRoutes);
        app.use(express.static(path.join(__dirname, 'public')));
        app.listen(app.get('port'), () => {
            console.log('server on port', app.get('port'));
        });
    })
    .catch(error => {
        console.error('No fue posible conectar con SQL Server:', error.message);
        process.exitCode = 1;
    });


