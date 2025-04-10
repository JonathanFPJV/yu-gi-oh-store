const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Página principal
router.get('/', async (req, res) => {
  try {
    // Obtener productos destacados
    const [featuredProducts] = await pool.query(
      'SELECT * FROM products ORDER BY RAND() LIMIT 4'
    );
    
    res.render('index', { 
      title: 'Inicio',
      featuredProducts 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

// Página Nosotros
router.get('/about', (req, res) => {
  res.render('about', { title: 'Nosotros' });
});

// Página Contacto
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contacto' });
});

module.exports = router;