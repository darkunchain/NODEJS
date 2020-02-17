const express = require('express');
const router = express.Router();
const IncidenteNuevo = require ('../model')
const fs = require('fs')
//  './src/archivos/Incidentes.xlsx.json'



router.get('/nuevo', async (req, res) => {
    var ruta = './src/archivos/Requerimientos enero.xlsx.json';
    leeArchivo(ruta);

    function leeArchivo(file)  {  
        fs.readFile(file, 'utf8', async function (err, data) {
            if (err)
                throw err;
            try {            
                obj = await JSON.parse(data);       
            }
            catch (e) {
                console.error(e);
            }            
            const IncidenteNewFile =  new IncidenteNuevo({'nombre':'Requerimientos_Enero', 'contenido': obj, 'categoria':'Requerimientos'})
            await IncidenteNewFile.save();
        });                    
      };   
    res.redirect('/')
  });


module.exports = router;


