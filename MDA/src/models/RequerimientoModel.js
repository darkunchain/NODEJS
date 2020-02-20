//Modelos de datos para almacenar

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Requerimiento = new Schema({
  nombre: String,
  fecha: { type: Date, default: Date.now },
  status: {
    type: Boolean,
    default: false
  },
  contenido: [
    {
      "ANS Avance Incidente": String,
      "ID de orden de trabajo+": String,
      "Resumen*": String,
      "Servicio*+": String,
      Prioridad: String,
      "Estado*": String,
      "Nombre de grupo de soporte de usuario asignado+": String,
      "Fecha de envío": String,
      "Hora de envío": String,
      "Fecha completada": String,
      "Hora completada": String,
      "Fecha de finalización real+": String,
      "Fecha de inicio real+": String,
      "Fecha de última modificación": String,
      "Estado de SLM": String,
      "Tiempo Total Gestión": String,
      "Estado SLM en tiempo real": String,
      ContactFullName: String,
      "Correo electrónico de contacto": String,
      "Gestor de Peticiones": String,
      "Motivo del estado": String,
      "Nombre de grupo de soporte de gestor*": String,
      "Tipo Cuidad*": String,
      "Usuario asignado a petición": String,
      "Tiempo Creación (HH:mm)": String,
      "ANS Creación Requerimiento": String,
      "Tiempo Avance Incidente": String
    }
  ],
  categoria: String
});

module.exports = mongoose.model("Requerimiento", Requerimiento);
