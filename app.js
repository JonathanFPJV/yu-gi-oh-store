require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
  secret: 'your-secret-key', // Cambia esto por una clave secreta segura
  resave: false,
  saveUninitialized: true
}));

// Middleware de flash
app.use(flash());

// Middleware para exponer mensajes flash a las vistas
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Rutas
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Conexión a la BD
require('./models/db');

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});