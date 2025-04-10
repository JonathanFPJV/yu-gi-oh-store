const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products');
    res.render('products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

// Mostrar detalle de producto
router.get('/:id', async (req, res) => {
  try {
    const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (product.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('product-detail', { product: product[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;