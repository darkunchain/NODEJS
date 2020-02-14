const express = require('express');
const router = express.Router();
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json');
const TicketIM = 'TicketIM.xlsx';


router.get('/', (req, res) => {      

  res.render('index');
});


router.get('/api/xlsxtojson', (req, res) => {
  xlsxtojson({
    input: TicketIM,
    output: 'salida.json',
    LowerCaseHeaders: true
  }, (err, result) => {
    if(err) {
      res.json(err);
    }else {
      res.json(result);
    }
  });
});

router.get('/upload', function(req, res) {
  
});

router.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file  
  
  let sampleFile = req.files.TicketIM;  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./' + sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    //res.send('File uploaded!');
    console.log('File uploaded!')
  });
});




module.exports = router;