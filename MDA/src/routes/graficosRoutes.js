const express = require("express");
const router = express.Router();
const IMNuevo = require("../models/IMModel");
const IncidenteNuevo = require("../models/IncidenteModel");
const RequerimientoNuevo = require("../models/RequerimientoModel");


router.get("/graficar/", async (req, res) => {
    const { idIM, idInc, idReq } = req.query
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
    function contar(tipo, prop) {
        for (var i = 0; i < tipo.length; i++) {
            if (temp.indexOf(tipo[i][prop]) == -1) {
                temp.push(tipo[i][prop]);
                var _data = {};
                _data.name = tipo[i][prop];
                _data.count = 1;
                produce.push(_data);
            } else {
                for (var j = 0; j < produce.length; j++) {
                    if (produce[j].name === tipo[i][prop]) {
                        var _x = parseInt(produce[j].count) + 1;
                        produce[j].count = _x;
                    }
                }
            }
        }
        return produce
    }

    //////////// Funcion para contar elementos /////////////
    var temp = [];
    var produce = [];
    function contarSin(tipo, prop, sin) {
        for (var i = 0; i < tipo.length; i++) {
            if (temp.indexOf(tipo[i][prop]) == -1 && tipo[i][prop] != sin) {
                temp.push(tipo[i][prop]);
                var _data = {};
                _data.name = tipo[i][prop];
                _data.count = 1;
                produce.push(_data);
            } else {
                for (var j = 0; j < produce.length; j++) {
                    if (produce[j].name === tipo[i][prop]) {
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
        return function (a, b) {

            if (a[prop] > b[prop]) {
                return -1;
            } else if (a[prop] < b[prop]) {
                return 1;
            }
            return 0;
        }
    }

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
    //%%%%%%%%%%%%%%%%%%%%%%%% Figuras %%%%%%%%%%%%%%%%%%%%%%%%%//
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

    /////%%%%%%%%%%%%%%/////   Figura 1 /////%%%%%%%%%%%%%%/////
    var Figura1 = [IncC.length, ReqC.length]

    /////%%%%%%%%%%%%%%/////   Figura 2 /////%%%%%%%%%%%%%%/////    
    var Fig2Inc = contar(IncC, "Prioridad")
    produce = []; temp = [];
    var Fig2Req = contar(ReqC, "Prioridad")
    produce = []; temp = [];

    /////%%%%%%%%%%%%%%/////   Figura 3 /////%%%%%%%%%%%%%%/////
    var Fig3Inc = contar(IncC, "Servicio")
    produce = []; temp = [];
    Fig3Inc = Fig3Inc.sort(ordenar("count")).slice(0, 10)
    /////%%%%%%%%%%%%%%/////   Figura 4 /////%%%%%%%%%%%%%%/////     
    var Fig4Req = contar(ReqC, "Servicio")
    produce = []; temp = [];
    Fig4Req = Fig4Req.sort(ordenar("count")).slice(0, 10)
    /////%%%%%%%%%%%%%%/////   Figura 5 /////%%%%%%%%%%%%%%/////     
    var Fig5Inc = contarSin(IncC, "Servicio", "CONECTIVIDAD WAN")
    produce = []; temp = [];
    Fig5Inc = Fig5Inc.sort(ordenar("count")).slice(0, 10)
    /////%%%%%%%%%%%%%%/////   Figura 6 /////%%%%%%%%%%%%%%/////     
    var Fig6Inc = contar(IncC, "Fuente Reportada")
    produce = []; temp = [];
    Fig6Inc = Fig6Inc.sort(ordenar("count")).slice(0, 10)
    var Fig6Req = contar(ReqC, "Fuente Reportada")
    produce = []; temp = [];
    Fig6Req = Fig6Req.sort(ordenar("count")).slice(0, 10)


    res.render('figuras', {
        Figura1,
        Fig2Inc, Fig2Req,
        Fig3Inc, Fig4Req,
        Fig5Inc,
        Fig6Inc, Fig6Req
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
