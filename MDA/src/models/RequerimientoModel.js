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
      "Tiempo Total": String,
      "Número de Requerimiento": String,
      "Compañía": String,
      "Grupo de Soporte Asignado": String,
      "Asignado": String,
      "Creado por": String,
      "Resumen": String,
      "Servicio": String,
      "Categorización Operacional Nivel 1": String,
      "Categorización Operacional Nivel 2": String,
      "Categorización Operacional Nivel 3": String,
      "Fecha Programada Inicio (Ingreso de Solicitud)": String,
      "Fecha Envío (Creación)": String,
      "Hora Envío (Creación)": String,
      "Tiempo Creación (HH:mm)": String,
      "ANS Creacion Requerimiento": String,
      "Fecha Terminado": String,
      "Hora Terminado": String,
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
      "Tiempo de Gestión Acumulado": String
    }
  ],
  categoria: String
});

module.exports = mongoose.model("Requerimiento", Requerimiento);
