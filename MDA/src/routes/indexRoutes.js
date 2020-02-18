const express = require('express');
const router = express.Router();
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json');
const multer = require('multer');
const upload = multer({ dest: './archivos/' });
const IncidenteNuevo = require ('../model')
const url = require('url');


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
  console.log('req.query: ', req.query)
  var { id,file }= req.query;    
  xlsxtojson({
    input: './src/archivos/' + file,
    output: './src/archivos/'+ file + '.json',
    LowerCaseHeaders: true
  }, (err, result) => {
    if(err) {
      res.json(err);
    }else {
      res.redirect(url.format({
        pathname:"/xlsxtojson/",
        query: {
           "idcat": id,         
           "file": file
         }
      })
      );;
    }
  });
});


////////////// upload Route  //////////////////

router.get('/upload', function(req, res) {
  
});

router.post('/upload', upload.single('file'), async function(req, res) {
  
  //const { idcarga, fileName} = req.params;
  const sampleFile = req.files.file;
  console.log('req.query: ',req.query,'req.params: ',req.params,'req.body: ',req.body)
  
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }     
  
  //console.log('samplefile: ',sampleFile)  
  sampleFile.mv('./src/archivos/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    console.log('File uploaded!');        
    res.redirect(url.format({
      pathname:"/xlsxtojson1/",
      query: {
         "id": idcarga,         
         "file": sampleFile.name
       }
    })
    );
  });
});



module.exports = router;