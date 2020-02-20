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
      "Tiempo Total (HH:mm)": String,
      "Número de Incidente": String,
      "Compañía": String,
      "Grupo de Soporte": String,
      "Asignado": String,
      "Creado Por": String,
      "Resumen": String,
      "Servicio": String,
      "Grupo Propietario": String,
      "Categorización Operacional Nivel 1": String,
      "Categorización Operacional Nivel 2": String,
      "Categorización Operacional Nivel 3": String,
      "Fecha Notificación (Apertura)": String,
      "Hora Notificación (Apertura)": String,
      "Fecha Envío (Guardado Inicial)": String,
      "Hora Envío (Guardado Inicial)": String,
      "Tiempo Creación (HH:mm)": String,
      "ANS Creación Incidente": String,
      "Fecha Resuelto": String,
      "Hora Resuelto": String,
      "Fecha Cierre": String,
      "Fuente Reportada": String,
      "Estado": String,
      "Motivo de Estado": String,
      "Prioridad": String,
      "SLA": String,
      "Estado de SLA": String,
      "Tiempo Objetivo SLA (HH:mm)": String,
      "Fecha Inicio de Detenido": String,
      "Fecha de Vencimiento": String,
      "Tiempo Detenido Acumulado (HH:mm)": String,
      "Tiempo de Gestión Acumulado (HH:mm)": String
    }
  ],
  categoria: String
});


module.exports = mongoose.model("Incidente", Incidente);
