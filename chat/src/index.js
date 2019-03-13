const express = require('express');
const path = require('path');
const app = express();
const SocketIO = require('socket.io');



//settings
app.set('port', process.env.PORT || 3000);

//run server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//static Files
app.use(express.static(path.join(__dirname, 'public')));

const io = SocketIO(server);

//websockets
io.on('connection', (socket) => {
console.log('nueva conexion establecida', socket.id);
});