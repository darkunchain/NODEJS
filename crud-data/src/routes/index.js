const express = require('express');
const router = express.Router();
const Coord = require('../model/coord');
const convertCSVToArray  = require('convert-csv-to-array');

router.get('/', async (req, res) => {
  const coords = await Coord.find();
  
  var coordsx = coords.map(function (item) {
    return item.x;
  });
  var coordsy = coords.map(function (item) {       
    return item.y;
  }); 

  

  res.render('index', {coords, coordsx, coordsy}
  );
});

//console.log(coords);


router.post('/add', async (req, res, next) => {
  const coord = new Coord(req.body);
  await coord.save();
  res.redirect('/');
});


router.get('/edit/:id', async (req, res, next) => {
  const coord = await Coord.findById(req.params.id);
  console.log(coord);
  res.render('edit', { coord });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Coord.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Coord.remove({_id: id});
  res.redirect('/');
});


module.exports = router;
