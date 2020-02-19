const express = require('express');
const router = express.Router();
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json');
const IMNuevo = require('../models/IMModel')
const IncidenteNuevo = require('../models/IncidenteModel')
const RequerimientoNuevo = require('../models/RequerimientoModel')
const url = require('url');


////////////// Index Route  //////////////////
router.get('/', async (req, res) => {
  const nameCarga = ['IM', 'Incidentes', 'Requerimientos']
  const listaIM = await IMNuevo.find().sort({ fecha: 'desc' })
  const listaIncidente = await IncidenteNuevo.find().sort({ fecha: 'desc' })
  const listaRequerimiento = await RequerimientoNuevo.find().sort({ fecha: 'desc' })
  //console.log('nombrecarga: ', nombrecarga.1)
  res.render('index', { nameCarga, listaIM, listaIncidente, listaRequerimiento });
});

router.post('/', (req, res) => {

});

////////////// xlsxtojson Route  //////////////////
router.get('/xlsxtojson/', async (req, res) => {
  const { idCarga, fileName, file } = req.query;
  if (idCarga == 1) {
    var sheet = 'Reporte IM'
  } else if (idCarga == 2) {
    sheet = 'Modificada'
  } else {
    sheet = 'Modificada'
  } 
    xlsxtojson({
      input: './src/archivos/' + file,
      output: './src/archivos/' + file + '.json',
      sheet: sheet,
      LowerCaseHeaders: true
    }, async (err, result) => {
      console.time('leerArchivo: ')
      if (err) {
        res.json(err);
      }else {        
        var categoria = ''
        if (idCarga == 1) {
          console.log('idCarga 1')
          categoria = 'IM'
          const IMNewFile = new IMNuevo({ 'nombre': fileName, 'contenido': result, categoria })
          await IMNewFile.save()   
          console.timeEnd('leerArchivo: ')       
        } else if (idCarga == 2) {
          console.log('idCarga 2')
          categoria = 'Incidentes'
          const IncidenteNewFile = new IncidenteNuevo({ 'nombre': fileName, 'contenido': result, categoria })
          await IncidenteNewFile.save();
        } else {
          console.log('idCarga 3')
          categoria = 'Requerimientos'
          const RequerimientoNewFile = new RequerimientoNuevo({ 'nombre': fileName, 'contenido': result, categoria })
          await RequerimientoNewFile.save();
        }        
        res.redirect('/')
      }
    });  
});


////////////// upload Route  //////////////////

router.get('/upload', function (req, res) {

});

router.post('/upload', async function (req, res) {
  const sampleFile = req.files.file;
  const { idCarga, fileName } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile.mv('./src/archivos/' + sampleFile.name, function (err) {
    if (err)
      return res.status(500).send(err);
    console.log('File uploaded!');
    res.redirect(url.format({
      pathname: "/xlsxtojson/",
      query: {
        idCarga,
        fileName,
        "file": sampleFile.name
      }
    })
    );
  });
});



module.exports = router;