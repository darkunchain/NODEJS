const express = require('express');
const router = express.Router();
const nslookup = require('nslookup');
const dnsEqual = require('dns-equal');


var timer;
var nsl = [{ sitio: 'w3.registraduria.gov.co', ip: [] }];
var serverDNS = '200.13.249.101';
var sitios = [
  'escuelavirtual.registraduria.gov.co',
  'agenda.registraduria.gov.co',
  'consultas.registraduria.gov.co',
  'www5.registraduria.gov.co',
  'epagos.registraduria.gov.co',
  'wsp.registraduria.gov.co',
  'elecciones.registraduria.gov.co',
  'elecciones1.registraduria.gov.co',
  'www.registraduria.gov.co',
  'correo.registraduria.gov.co',
  'web.registraduria.gov.co',
  'w3.registraduria.gov.co'
];

router.get('/', (req, res) => {
  timer = setInterval(function () {    
    sitios.forEach(function (item) { 
    nslookup(item)
    .server(serverDNS)           
    .end(function (err, addrs){      
      console.log('ip: ', addrs);
      //var datos = {sitio: item,ip: addrs};
      //nsl.push(datos);        
    });
    
  });   
  }, 5000);  
  res.render('index');
});

router.get('/stop', (req, res) => {  
  clearInterval(timer);
  res.render('index');
});

  var domain1 = 'wsp.registraduria.gov.co'
  var domain2 = '190.248.51.105'
  if (dnsEqual(domain1, domain2)) {
    console.log('Los dominios son iguales')
  }else{
    console.log('los dominios son diferentes')
  }
  
  
  




module.exports = router;
