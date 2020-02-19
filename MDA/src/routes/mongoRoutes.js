const express = require('express');
const router = express.Router();
const IncidenteNuevo = require ('../models/IncidenteModel')
const RequerimientoNuevo = require ('../models/RequerimientoModel')
const IMNuevo = require ('../models/IMModel')
const fs = require('fs')




router.get('/nuevo', async (req, res) => {
    var { idCarga , file, fileName } = req.query
    var ruta = './src/archivos/'+file+'.json';
    leeArchivo(ruta, idCarga, fileName);

    function leeArchivo(file, idCarga, fileName)  {  
        fs.readFile(file, 'utf8', async function (err, data) {
            if (err)
                throw err;
            try {            
                obj = await JSON.parse(data);       
            }
            catch (e) {
                console.error(e);
            }
            console.log('file: ',file, 'idCarga: ', idCarga,'fileName: ',fileName)
            var categoria = ''
            if(idCarga==1){
                console.log('idCarga 1')
                categoria = 'IM'                
                const IMNewFile =  new IMNuevo({ 'nombre': fileName, 'contenido': obj, categoria })                
                await IMNewFile.save();
                MDA.runCommand( { serverStatus: 1,  repl: 1 } )
            }else if (idCarga==2){
                console.log('idCarga 2')
                categoria = 'Incidentes'
                const IncidenteNewFile =  new IncidenteNuevo({'nombre':fileName, 'contenido': obj, categoria})
                await IncidenteNewFile.save();
            }else {
                console.log('idCarga 3')
                categoria = 'Requerimientos'
                const RequerimientoNewFile =  new RequerimientoNuevo({'nombre':fileName, 'contenido': obj, categoria})
                await RequerimientoNewFile.save();
            }
            
        });                    
      };   
    res.redirect('/')
  });


  router.get('/manual', async (req, res) => {
    var ruta = './src/archivos/Ticket IM.xlsx.json';
    var idCarga1 = 1
    var fileName1 = 'Ticket IM Enero'
    leeArchivo(ruta, idCarga1, fileName1);

    function leeArchivo(file, idCarga1, fileName1)  {  
        fs.readFile(file, 'utf8', async function (err, data) {
            if (err)
                throw err;
            try {            
                obj = await JSON.parse(data);       
            }
            catch (e) {
                console.error(e);
            }
            console.log('file: ',file, 'idCarga1: ', idCarga1,'fileName1: ',fileName1)
            var categoria = ''
            if(idCarga1==1){
                console.log('idCarga 1')
                categoria = 'IM'
                const IMNewFile =  new IMNuevo({'nombre':fileName1, 'contenido': obj, categoria})
                await IMNewFile.save();
            }else if (idCarga1==2){
                console.log('idCarga 2')
                categoria = 'Incidentes'
                const IncidenteNewFile =  new IncidenteNuevo({'nombre':fileName1, 'contenido': obj, categoria})
                await IncidenteNewFile.save();
            }else {
                console.log('idCarga 3')
                categoria = 'Requerimientos'
                const RequerimientoNewFile =  new RequerimientoNuevo({'nombre':fileName1, 'contenido': obj, categoria})
                await RequerimientoNewFile.save();
            }
            
        });                    
      };   
    res.redirect('/')
  });


module.exports = router;


