const socket = io();

//DOM elements
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    socket.emit('chat:usuario', {
        usuario: usuario.value,
        mensaje: mensaje.value 
    }); 
});

mensaje.addEventListener('change', () => {
    socket.emit('chat:usuario_escribiendo', usuario.value);
});

socket.on('chat:servidor', (data) => {
    output.innerHTML += `<p>
    <strong>${data.usuario}</strong>: ${data.mensaje}
    </p>`
})

socket.on('chat:servidor_escribiendo', (data) => {
    actions.innerHTML += `<p align="right"><em>${data}</em> esta escribiendo ... </p>`
})