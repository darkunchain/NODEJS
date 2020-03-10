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

     //////////// Funcion para contar elementos /////////////
     var temp = [];
     var produce = [];
     function contarCon(tipo, prop1, prop2, sin) {
         for (var i = 0; i < tipo.length; i++) {
             if (temp.indexOf(tipo[i][prop2]) == -1 && tipo[i][prop1] == sin) {
                 temp.push(tipo[i][prop2]);
                 var _data = {};
                 _data.name = tipo[i][prop2];
                 _data.count = 1;
                 produce.push(_data);
             } else {
                 for (var j = 0; j < produce.length; j++) {
                     if (produce[j].name === tipo[i][prop2]) {
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

    /////%%%%%%%%%%%%%%/////   Figura 12 /////%%%%%%%%%%%%%%/////
    var Fig12 = contarSin(IMC, "FALLA % UNE", "")
    produce = []; temp = [];
    var lab12n=['a','b','c','d','e','f','g','h','i','j'],iter12=[]
    if(Fig12.length > 10){
        Fig12 = Fig12.sort(ordenar("count")).slice(0, 10)        
    }else{
        Fig12 = Fig12.sort(ordenar("count"))
        lab12n = lab12n.slice(0, Fig12.length)
    }
    for(var item in Fig12){
        iter12.push({"ind":lab12n[item],"falla":Fig12[item].name})
    }
    var next12=[Fig12[0], Fig12[1]]

    /////%%%%%%%%%%%%%%/////   Figura 13 /////%%%%%%%%%%%%%%/////
    var Fig13 = contarSin(IMC, "FALLA % REGISTRADURIA", "")
    produce = []; temp = [];
    var lab13n=['a','b','c','d','e','f','g','h','i','j'],iter13=[]
    if(Fig13.length > 10){
        Fig13 = Fig13.sort(ordenar("count")).slice(0, 10)        
    }else{
        Fig13 = Fig13.sort(ordenar("count"))
        lab13n = lab13n.slice(0, Fig13.length)
    }
    for(var item in Fig13){
        iter13.push({"ind":lab13n[item],"falla":Fig13[item].name})
    }
    var next13=[Fig13[0], Fig13[1]]

    /////%%%%%%%%%%%%%%/////   Figura 14 /////%%%%%%%%%%%%%%/////
    var Fig14 = contarSin(IMC, "FALLA % OTROS", "")
    produce = []; temp = [];
    var lab14n=['a','b','c','d','e','f','g','h','i','j'],iter14=[]
    if(Fig14.length > 10){
        Fig14 = Fig14.sort(ordenar("count")).slice(0, 10)        
    }else{
        Fig14 = Fig14.sort(ordenar("count"))
        lab14n = lab14n.slice(0, Fig14.length)
    }
    for(var item in Fig14){
        iter14.push({"ind":lab14n[item],"falla":Fig14[item].name})
    }
    var next14=[Fig14[0], Fig14[1]]

    /////%%%%%%%%%%%%%%/////   Figura 15 /////%%%%%%%%%%%%%%/////    
    var Fig15 = contarCon(IMC, "FALLA % UNE", "MUNICIPIO", next12[0].name)
    produce = []; temp = [];    
    Fig15 = Fig15.sort(ordenar("count")).slice(0, 10)
    tit15=next12[0].name

    /////%%%%%%%%%%%%%%/////   Figura 16 /////%%%%%%%%%%%%%%/////    
    var Fig16 = contarCon(IMC, "FALLA % UNE", "MUNICIPIO", next12[1].name)
    produce = []; temp = [];    
    Fig16 = Fig16.sort(ordenar("count")).slice(0, 10)
    tit16=next12[1].name

    /////%%%%%%%%%%%%%%/////   Figura 17 /////%%%%%%%%%%%%%%/////    
    var Fig17 = contarCon(IMC, "FALLA % REGISTRADURIA", "MUNICIPIO", next13[0].name)
    produce = []; temp = [];    
    Fig17 = Fig17.sort(ordenar("count")).slice(0, 10)
    tit17=next13[0].name

    /////%%%%%%%%%%%%%%/////   Figura 18 /////%%%%%%%%%%%%%%/////    
    var Fig18 = contarCon(IMC, "FALLA % REGISTRADURIA", "MUNICIPIO", next13[1].name)
    produce = []; temp = [];    
    Fig18 = Fig18.sort(ordenar("count")).slice(0, 10)
    tit18=next13[1].name

    /////%%%%%%%%%%%%%%/////   Figura 19 /////%%%%%%%%%%%%%%/////    
    var Fig19 = contarCon(IMC, "FALLA % OTROS", "MUNICIPIO", next14[0].name)
    produce = []; temp = [];    
    Fig19 = Fig19.sort(ordenar("count")).slice(0, 10)
    tit19=next14[0].name

    /////%%%%%%%%%%%%%%/////   Figura 20 /////%%%%%%%%%%%%%%/////    
    var Fig20 = contarCon(IMC, "FALLA % OTROS", "MUNICIPIO", next14[1].name)
    produce = []; temp = [];    
    Fig20 = Fig20.sort(ordenar("count")).slice(0, 10)
    tit20=next14[1].name

    /////%%%%%%%%%%%%%%/////   Figura 21 /////%%%%%%%%%%%%%%/////
    var Fig21 = contar(IncC, "Fecha Notificación (Apertura)")
    produce = []; temp = [];    
    Fig21 = Fig21.sort(ordenar("name"))
    tit21="Creación de Incidentes por Fecha"
    

    /////%%%%%%%%%%%%%%/////   Figura 22 /////%%%%%%%%%%%%%%/////
    var Fig22 = contar(ReqC, "Fecha Envío (Creación)")
    produce = []; temp = [];    
    Fig22 = Fig22.sort(ordenar("name"))
    tit22="Creación de Requerimientos por Fecha"
    var Fig22d = new Date(Fig22[0].name)
    console.log('Fig22: ',Fig22[0],'Fig22d: ', Fig22d)
    Date.parse(Fig22d,"mm/dd")
    //Date.parse()
    
    


    res.render('partials/figuras/figuras', {
        Figura1,
        Fig2Inc, Fig2Req,
        Fig3Inc, Fig4Req,
        Fig5Inc,
        Fig6Inc, Fig6Req,
        Fig7IM, Fig8IM,
        Fig9IM, Fig10IM,
        Figura11,
        Fig12,iter12,
        Fig13,iter13,
        Fig14,iter14,
        Fig15,tit15,
        Fig16,tit16,
        Fig17,tit17,
        Fig18,tit18,
        Fig19,tit19,
        Fig20,tit20,
        Fig21,tit21,
        Fig22,tit22,
    })

});

module.exports = router;


