//Modelos de datos para almacenar

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Incidente = new Schema({
  nombre: String,
  fecha: { type: Date, default: Date.now },
  status: {
    type: Boolean,
    default: false
  },
  contenido: [
    {
      "ANS Avance Incidente": String,
      "ID de la incidencia*+": String,
      "Resumen*": String,
      "Servicio*+": String,
      "Prioridad*": String,
      "Estado*": String,
      "Grupo asignado*+": String,
      "Usuario asignado+": String,
      "Grupo de propietarios+": String,
      Propietario: String,
      "Fecha de notificación+": String,
      "Hora de notificación": String,
      "Fecha de envío": String,
      "Hora de envío": String,
      "Last Resolved Date": String,
      "Last Resolved Hour": String,
      "Fecha de cierre": String,
      "Estado SLM en tiempo real": String,
      "Tiempo Total Gestión": String,
      "Fuente reportada*": String,
      "Tiempo Creación (HH:mm)": String,
      "ANS Creación Incidente": String,
      "Tiempo Avance Incidente": String
    }
  ],
  categoria: String
});

module.exports = mongoose.model("Incidente", Incidente);
