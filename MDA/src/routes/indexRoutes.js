const express = require('express');
const router = express.Router();
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json');
const multer = require('multer');
const upload = multer({ dest: './archivos/' });
const IncidenteNuevo = require ('../model')


////////////// Index Route  //////////////////
router.get('/', async (req, res) => {
  const nameCarga = ['IM', 'Incidentes','Requerimientos']
  const lista = await IncidenteNuevo.find().sort({fecha:'desc'})
  //console.log('nombrecarga: ', nombrecarga.1)
  res.render('index',{nameCarga,lista});
});

router.post('/', (req, res) => {
  
});

////////////// xlsxtojson Route  //////////////////
router.get('/xlsxtojson', (req, res) => {
  console.log('req.query: ', req.query.file)
  var nombre=req.query.file;
  xlsxtojson({
    input: './src/archivos/' + nombre,
    output: './src/archivos/'+ nombre + '.json',
    LowerCaseHeaders: true
  }, (err, result) => {
    if(err) {
      res.json(err);
    }else {
      res.redirect('/');
    }
  });
});


////////////// upload Route  //////////////////

router.get('/upload', function(req, res) {
  
});

router.post('/upload/:idcarga/:nameForm', upload.single('nameForm'),async function(req, res) {
  
  const {idcarga} = req.params;
  const { nameForm } = req.params;
  const archivo = req.files;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  
  console.log('nameForm: ',nameForm)  
  //let sampleFile = req.files.nameForm;
  let sampleFile = req.files.file1;
  console.log('samplefile: ',sampleFile)  
  await sampleFile.mv('./src/archivos/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    console.log('File uploaded!');        
    res.redirect('/xlsxtojson/?file=' + sampleFile.name)    
  });
});




module.exports = router;