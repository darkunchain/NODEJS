const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coord = Schema({
  x: String,
  y: String  
});

//module.exports = mongoose.model('tasks', coord);
module.exports = mongoose.model('coords', coord);
