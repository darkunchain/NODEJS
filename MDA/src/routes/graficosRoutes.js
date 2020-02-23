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

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//%%%%%%%%%%%%%%%%%%%%%%% Funciones %%%%%%%%%%%%%%%%%%%%%%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
 
//////////// Funcion para contar elementos /////////////
    var temp = []; 
    var produce = [];    
    function contar(tipo,prop){
        for(var i=0;i<tipo.length;i++){
            if(temp.indexOf(tipo[i][prop]) == -1){                    
                temp.push(tipo[i][prop]);
                var _data = {};
                _data.name = tipo[i][prop];
                _data.count = 1;                
                produce.push(_data);
            }else{
                for(var j=0;j<produce.length;j++){
                        if(produce[j].name === tipo[i][prop]){
                            var _x = parseInt(produce[j].count) + 1;
                        produce[j].count = _x;
                        }
                }
            }
        }
        return produce
    }
//////////// Funcion para ordenar elementos /////////////
    function ordenar(prop) {  
        return function(a, b) {  
            if (a[prop] > b[prop]) {  
                return 1;  
            } else if (a[prop] < b[prop]) {  
                return -1;  
            }  
            return 0;  
        }  
    }

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//%%%%%%%%%%%%%%%%%%%%%%%% Figuras %%%%%%%%%%%%%%%%%%%%%%%%%//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

  /////%%%%%%%%%%%%%%/////   Figura 1 /////%%%%%%%%%%%%%%/////
  var Figura1 = [IncC.length,ReqC.length]

  /////%%%%%%%%%%%%%%/////   Figura 2 /////%%%%%%%%%%%%%%/////    
  var Fig2Inc = contar(IncC,"Prioridad")
  produce = [];temp = [];    
  var Fig2Req = contar(ReqC,"Prioridad")
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
  
    
    /////%%%%%%%%%%%%%%/////   Figura 3 /////%%%%%%%%%%%%%%/////
    var Fig3Inc = contar(IncC,"Servicio")
    produce = [];temp = [];    
    var Fig3Req = contar(ReqC,"Servicio")
    produce = [];temp = [];
    Fig3Inc = Fig3Inc.sort(ordenar("count"))
    Fig3Req = Fig3Req.sort(ordenar("count"))    
    var lab3Inc=[],dat3Inc=[],lab3Req=[],dat3Req=[],lab31Inc=[]
    for (var i=0;i<Fig3Inc.length;i++){
        lab3Inc.push(Fig3Inc[i].name)        
        dat3Inc.push(Fig3Inc[i].count)
    }
    for (var i=0;i<Fig3Req.length;i++){
        lab3Req.push(Fig3Req[i].name)        
        dat3Req.push(Fig3Req[i].count)
    }

    

    res.render('figuras', { 
        Figura1,
        lab2Inc, dat2Inc, lab2Req, dat2Req,
        Fig3Inc, dat3Inc, lab3Req, dat3Req
    })

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
