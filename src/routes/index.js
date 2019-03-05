const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index.html', { title: 'Digitalapp' })
});

router.get('/contacto', (req, res) => {
  res.render('contacto.html', { title: 'contactenos' })
});

router.get('/about', (req, res) => {
  res.render('about.html', { title: 'Acerca de nosotros' })
});

router.get('/productos', (req, res) => {
  res.render('prod.html', { title: 'Productos y servicios' })
});

router.get('/apps', (req, res) => {
  res.render('apps.html', { title: 'Aplicaciones' })
});

router.get('/catalogo', (req, res) => {
  res.render('catalogo.html', { title: 'Catalogo' })
});

router.get('/empleados', (req, res) => {
  res.render('empleados.html', { title: 'Empleados' })
});

router.get('/menu5', (req, res) => {
  res.render('menu5.html', { title: 'Menu5' })
});

router.get('/blog', (req, res) => {
  res.render('blog.html', { title: 'Blog' })
});



module.exports = router;