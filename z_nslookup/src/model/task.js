const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  fecha: String,
  sitio: String,
  ip:  Array  
});

module.exports = mongoose.model('logs', TaskSchema);
