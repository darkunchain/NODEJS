const express = require('express');
const router = express.Router();
const IncidenteNuevo = require('../models/IncidenteModel')
const RequerimientoNuevo = require('../models/RequerimientoModel')





router.get('/nuevo', async (req, res) => {
   
});


router.get('/manual', async (req, res) => {
    var ruta = './src/archivos/Ticket IM.xlsx.json';
    var idCarga1 = 1
    var fileName1 = 'Ticket IM Enero'
    leeArchivo(ruta, idCarga1, fileName1);

    function leeArchivo(file, idCarga1, fileName1) {
        console.time('leeArchivo: ')
        fs.readFile(file, 'utf8', async function (err, data) {
            if (err)
                throw err;
            try {
                obj = await JSON.parse(data);
                console.log('file: ', file, 'idCarga1: ', idCarga1, 'fileName1: ', fileName1)
                var categoria = ''
                if (idCarga1 == 1) {
                    console.log('idCarga 1')
                    categoria = 'IM'
                    const IMNewFile = new IMNuevo({ 'nombre': fileName1, 'contenido': obj, categoria })
                    await IMNewFile.save();
                } else if (idCarga1 == 2) {
                    console.log('idCarga 2')
                    categoria = 'Incidentes'
                    const IncidenteNewFile = new IncidenteNuevo({ 'nombre': fileName1, 'contenido': obj, categoria })
                    await IncidenteNewFile.save();
                } else {
                    console.log('idCarga 3')
                    categoria = 'Requerimientos'
                    const RequerimientoNewFile = new RequerimientoNuevo({ 'nombre': fileName1, 'contenido': obj, categoria })
                    await RequerimientoNewFile.save();
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    };    
    res.redirect('/')
});


module.exports = router;


