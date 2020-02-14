const express = require('express');
const router = express.Router();
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json');


router.get('/', (req, res) => {      

  res.render('index');
});


router.get('/api/xlsxtojson', (req, res) => {
  xlsxtojson({
    input: './TicketIM.xlsx',
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




module.exports = router;