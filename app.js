require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rutas
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
app.use('/', indexRoutes);
app.use('/products', productRoutes);

// Conexión a la BD
require('./models/db');

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});