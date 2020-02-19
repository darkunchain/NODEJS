//Este es el archivo de rutas para /json/...
// la ruta / corresponde a /json/
const express = require('express');
const router = express.Router();
const IncidenteNuevo = require ('../models/IMModel')
const fs = require('fs')

var obj
fs.readFile('./src/archivos/pruebas1.json', 'utf8', function (err, data) {
    if (err)
        throw err;
    try {            
        obj = JSON.parse(data);
    }
    catch (e) {
        console.error(e);
    }
    return obj
});


router.get('/', function(req, res) {    
    res.render('json')
});

router.get('/Incidentes', function(req, res) {    
    res.json(obj)
});

router.get('/list', async function(req, res) {    
    const lista = await IncidenteNuevo.find()
    console.log('lista.nombre: ', lista[0].nombre)   
    res.render('json', { lista })
});

  
module.exports = router;