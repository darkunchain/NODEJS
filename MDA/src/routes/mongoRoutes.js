const express = require('express');
const router = express.Router();
const IncidenteNuevo = require ('../model')
const fs = require('fs')
//  './src/archivos/Incidentes.xlsx.json'



router.get('/nuevo', async (req, res) => {
    var { idcat , file} = req.query
    var ruta = './src/archivos/'+file+'.json';
    leeArchivo(ruta,idcat);

    function leeArchivo(file,idcat)  {  
        fs.readFile(file, 'utf8', async function (err, data) {
            if (err)
                throw err;
            try {            
                obj = await JSON.parse(data);       
            }
            catch (e) {
                console.error(e);
            }
            var categoria = ''
            if(idcat=1){
                categoria = 'IM'
            }else if (idcat=2){
                categoria = 'Incidentes'
            }else {
                categoria = 'Requerimientos'
            }           
            const IncidenteNewFile =  new IncidenteNuevo({'nombre':'TicketIM_Enero', 'contenido': obj, 'categoria':categoria})
            await IncidenteNewFile.save();
        });                    
      };   
    res.redirect('/')
  });


module.exports = router;


