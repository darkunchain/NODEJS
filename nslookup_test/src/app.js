const path = require('path');
const express = require('express');
const app = express();
const nslookup = require('nslookup');
const SocketIO = require('socket.io');

// importing routes
const indexRoutes = require('./routes/index');



app.use(express.static(path.join(__dirname, 'public')));
const io = SocketIO(app);

//websockets
io.on('connection', (socket) => {
  console.log('nueva conexion establecida', socket.id);

  socket.on('chat:usuario', (data) => {
      io.sockets.emit('chat:servidor', data);
  });

  socket.on('chat:usuario_escribiendo', (data) => {
      socket.broadcast.emit('chat:servidor_escribiendo', data);
  });
});

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(express.urlencoded({extended: false}))

// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});



