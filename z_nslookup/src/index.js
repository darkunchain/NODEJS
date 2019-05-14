const express = require('express');
const path = require('path');
const app = express();
const SocketIO = require('socket.io');
const nslookup = require('nslookup');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Task = require('./model/task');


//settings
app.set('port', process.env.PORT || 3000);

// connection to db
mongoose.connect('mongodb://localhost/nslookup')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

//run server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//static Files
app.use(express.static(path.join(__dirname, 'public')));

const io = SocketIO(server);

var timer;
var nsl;
var logg;
var serverDNS = '200.13.249.101';
var sitios = [
    'escuelavirtual.registraduria.gov.co',
    'agenda.registraduria.gov.co',
    'consultas.registraduria.gov.co',
    'www5.registraduria.gov.co',
    'epagos.registraduria.gov.co',
    'wsp.registraduria.gov.co',
    'elecciones.registraduria.gov.co',
    'elecciones1.registraduria.gov.co',
    'www.registraduria.gov.co',
    'correo.registraduria.gov.co',
    'web.registraduria.gov.co',
    'w3.registraduria.gov.co'
];
var resolucion = [
    '201.232.123.7',
    '190.248.51.103',
    '201.232.123.23',
    '201.232.123.24',
    '200.13.252.62',
    '190.248.51.105',
    '190.248.51.101',
    '190.248.51.104',
    ',201.232.123.9',
    ',201.232.123.13',
    '201.232.123.5',
    '200.13.252.56'
];

//websockets

io.on('connection', (socket) => {
    console.log('nueva conexion establecida', socket.id);
    timer = setInterval(async function () {
        sitios.forEach(function (item, index) {
            nslookup(item)
                .server(serverDNS)
                .end(async function (err, addrs) {
                    if (addrs == resolucion[index]) {
                        est = 1
                    } else {
                        est = 0
                        var date = new Date()
                        var fechahora = date.getFullYear() + "-" + date.getDate() + "-" + date.getMonth() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        var dat = { fecha: fechahora, sitio: item, ip: addrs };
                        console.log('dat: ',dat)
                        await Task(dat).save()                        
                    }
                    var datos = { sitio: item, ip: addrs, estado: est };
                    nsl.push(datos);
                });
        });
        const logg = await Task.find()              
        io.sockets.emit('resultado:server', nsl,logg);
        socket.broadcast.emit('todos:server', nsl, logg);
        nsl = [];                 
    }, 5000);    
});


