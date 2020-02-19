//Modelos de datos para almacenar

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IM = new Schema({
  nombre: String,
  fecha: { type: Date, default: Date.now },
  contenido: [{
          "FALLA % OTROS": String,
          "# NÚMERO DE TICKET": String,
          "TIPO DE ALERTA": String,
          "TIPO DE SEDE": String,
          "DEPARTAMENTO": String,
          "MUNICIPIO": String,
          "SEDE": String,
          "FECHA DE CREACIÒN": String,
          "FECHA DE CIERRE": String,
          "COLA": String,
          "ESTADO": String,
          "CLIENTE": String,
          "TIPO": String,
          "FALLA": String,
          "PROVEEDOR": String,
          "TICKET PROVEEDOR": String,
          "FECHA CREACION PROVEEDOR": String,
          "FECHA SOLUCIÓN PROVEEDOR": String,
          "RESPONSABILIDAD": String,
          "OBSERVACIÒN": String,
          "FECHA SOLUCIÓN": String,
          "INDISPONIBILIDAD UNE": String,
          "INDISPONIBILIDAD % UNE": String,
          "FALLA % UNE": String,
          "INDISPONIBILIDAD REGISTRADURIA": String,
          "INDISPONIBILIDAD % REGISTRADURIA": String,
          "FALLA % REGISTRADURIA": String,
          "INDISPONIBILIDAD OTROS": String,
          "INDISPONIBILIDAD % OTROS": String
    }],    
  categoria: String
});

module.exports = mongoose.model('IM', IM);
