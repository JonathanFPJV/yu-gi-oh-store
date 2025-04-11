const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Ruta para obtener las órdenes
router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders');

    // Agregar un console.log para inspeccionar los datos recuperados
    console.log('Datos recuperados de la base de datos:', orders);

    // Convertir el campo 'total' a número
    const processedOrders = orders.map(order => ({
      ...order,
      total: parseFloat(order.total)
    }));

    res.render('orders', { orders: processedOrders });
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).send('Error al obtener las órdenes');
  }
});

module.exports = router;