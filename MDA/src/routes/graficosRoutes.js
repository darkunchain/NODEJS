const express = require("express");
const router = express.Router();
const IMNuevo = require("../models/IMModel");
const IncidenteNuevo = require("../models/IncidenteModel");
const RequerimientoNuevo = require("../models/RequerimientoModel");
var Chart = require('chart.js');

router.get("/graficar/", async (req, res) => {
    const { idIM, idInc, idReq} = req.query 
    const Inc = await IncidenteNuevo.findById(idInc)
    const Req = await RequerimientoNuevo.findById(idReq)
    const IM = await IMNuevo.findById(idIM)    
    var Figura1 = [Inc.contenido.length,Req.contenido.length]
    res.render('figuras', { Figura1})
});

module.exports = router;




/* data = {
  datasets: [{
      data: [10, 20, 30]
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
      'Red',
      'Yellow',
      'Blue'
  ]
}; */
