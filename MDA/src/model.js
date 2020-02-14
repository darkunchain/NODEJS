//Modelos de datos para almacenar

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nuevoEsquema = new Schema({
    title: String,
    descripcion: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('tareas', nuevoEsquema);
