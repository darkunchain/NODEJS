const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index.html', { title: 'Digitalapp' })
});

router.get('/menu1', (req, res) => {
  res.render('index.html', { title: 'contactenos' })
});

router.get('/menu2', (req, res) => {
  res.render('index.html', { title: 'Acerca de nosotros' })
});

router.get('/menu3', (req, res) => {
  res.render('index.html', { title: 'Productos y servicios' })
});

router.get('/menu4', (req, res) => {
  res.render('index.html', { title: 'Aplicaciones' })
});

router.get('/menu5', (req, res) => {
  res.render('index.html', { title: 'Catalogo' })
});

router.get('/empleados', (req, res) => {
  res.render('index.html', { title: 'Empleados' })
});

router.get('/menus', (req, res) => {
  res.render('index.html', { title: 'Menu5' })
});

router.get('/blog', (req, res) => {
  res.render('index.html', { title: 'Blog' })
});



module.exports = router;