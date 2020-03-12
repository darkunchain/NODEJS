//Modelos de datos para almacenar

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departamento = new Schema({
  
    
      departamento: String,
      numMun: Number,
      capital:String
    
  
 
});

module.exports = mongoose.model("departamento", departamento);
