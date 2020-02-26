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

    /////%%%%%%%%%%%%%%/////   Figura 7 /////%%%%%%%%%%%%%%/////     
    var Fig7IM = contar(IMC, "DEPARTAMENTO")
    produce = []; temp = [];
    Fig7IM = Fig7IM.sort(ordenar("count")).slice(0, 10)

    /////%%%%%%%%%%%%%%/////   Figura 8 /////%%%%%%%%%%%%%%/////     
    var Fig8IM = contar(IMC, "MUNICIPIO")
    produce = []; temp = [];
    Fig8IM = Fig8IM.sort(ordenar("count")).slice(0, 10)

    /////%%%%%%%%%%%%%%/////   Figura 9 /////%%%%%%%%%%%%%%/////     
    var Fig9IM = contar(IMC, "TIPO DE SEDE")
    produce = []; temp = [];
    Fig9IM = Fig9IM.sort(ordenar("count")).slice(0, 10)

    /////%%%%%%%%%%%%%%/////   Figura 10 /////%%%%%%%%%%%%%%/////     
    var Fig10IM = contarSin(IMC, "TIPO DE SEDE", "MUNICIPAL")
    produce = []; temp = [];
    Fig10IM = Fig10IM.sort(ordenar("count")).slice(0, 10)   

    /////%%%%%%%%%%%%%%/////   Figura 11 /////%%%%%%%%%%%%%%/////
    var Fig11TIGO = contarSin(IMC, "FALLA % UNE", "")
    produce = []; temp = [];
    var Fig11RNEC = contarSin(IMC, "FALLA % REGISTRADURIA", "")
    produce = []; temp = [];
    var Fig11OTRO = contarSin(IMC, "FALLA % OTROS", "")
    produce = []; temp = [];

    var Fig11T = 0, Fig11R = 0, Fig11O = 0
    for(item in Fig11TIGO)
        Fig11T += Fig11TIGO[item].count
    for(item in Fig11RNEC)
        Fig11R += Fig11RNEC[item].count
    for(item in Fig11OTRO)
        Fig11O += Fig11OTRO[item].count   
   var Figura11 = [Fig11T, Fig11R, Fig11O]    


    res.render('partials/figuras/figuras', {
        Figura1,
        Fig2Inc, Fig2Req,
        Fig3Inc, Fig4Req,
        Fig5Inc,
        Fig6Inc, Fig6Req,
        Fig7IM, Fig8IM,
        Fig9IM, Fig10IM,
        Figura11
    })

});

module.exports = router;


