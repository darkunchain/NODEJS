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
    const IncC = Inc.contenido
    const ReqC = Req.contenido
    const IMC = IM.contenido
   /////%%%%%%%%%%%%%%/////   Figura 1 /////%%%%%%%%%%%%%%/////
    var Figura1 = [IncC.length,ReqC.length]

    /////%%%%%%%%%%%%%%/////   Figura 2 /////%%%%%%%%%%%%%%/////
    var temp = []; 
    var produce = [];
    //////////// Funcion para contar elementos /////////////
    function contar2(tipo){
        for(var i=0;i<tipo.length;i++){
            if(temp.indexOf(tipo[i].Prioridad) == -1){
                    temp.push(tipo[i].Prioridad);
                var _data = {};
                _data.name = tipo[i].Prioridad;
                _data.count = 1;                
                produce.push(_data);
            }else{
                for(var j=0;j<produce.length;j++){
                        if(produce[j].name === tipo[i].Prioridad){
                            var _x = parseInt(produce[j].count) + 1;
                        produce[j].count = _x;
                        }
                }
            }
        }
        return produce
    }    
    var Fig2Inc = contar2(IncC)
    produce = [];temp = [];
    
    var Fig2Req = contar2(ReqC)
    produce = [];temp = [];    
    var lab2Inc=[],dat2Inc=[],lab2Req=[],dat2Req=[]
    for (var i=0;i<Fig2Inc.length;i++){
        lab2Inc.push(Fig2Inc[i].name)
        dat2Inc.push(Fig2Inc[i].count)
    }
    for (var i=0;i<Fig2Req.length;i++){
        lab2Req.push(Fig2Req[i].name)
        dat2Req.push(Fig2Req[i].count)
    }
    res.render('figuras', { 
        Figura1,
        lab2Inc,
        dat2Inc,
        lab2Req,
        dat2Req})



 /////%%%%%%%%%%%%%%/////   Figura 3 /////%%%%%%%%%%%%%%/////

    var temp = []; 
    var produce = [];
    //////////// Funcion para contar elementos /////////////
    function contar3(tipo){
        for(var i=0;i<tipo.length;i++){
            if(temp.indexOf(tipo[i].Servicio) == -1){
                    temp.push(tipo[i].Servicio);
                var _data = {};
                _data.name = tipo[i].Servicio;
                _data.count = 1;                
                produce.push(_data);
            }else{
                for(var j=0;j<produce.length;j++){
                        if(produce[j].name === tipo[i].Servicio){
                            var _x = parseInt(produce[j].count) + 1;
                        produce[j].count = _x;
                        }
                }
            }
        }
        return produce
    }
    var Fig3Inc = contar3(IncC)
    produce = [];temp = [];
    
    var Fig3Req = contar3(ReqC)
    produce = [];temp = [];
    a = Fig3Inc.sort(count)
    b = Fig3Req.sort(count)    
    console.log('Fig3Inc: ',Fig3Inc, 'Fig3Inc: ', a)



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
