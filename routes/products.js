const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/images/products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Máximo 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Solo se permiten imágenes (JPEG/JPG/PNG)'));
  }
});

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

// Ruta para mostrar el formulario de agregar producto
router.get('/add', (req, res) => {
  res.render('add-product', {
    title: 'Agregar Producto',
    messages: {
      error: req.flash('error'),
      success: req.flash('success')
    }
  });
});

// Ruta para procesar el formulario de agregar producto
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, rarity, stock } = req.body;

    // Validar campos requeridos
    if (!name || !price || !category || !stock) {
      throw new Error('Todos los campos marcados como * son obligatorios');
    }

    // Validar que se haya subido una imagen
    if (!req.file) {
      throw new Error('Debes subir una imagen del producto');
    }

    // Insertar producto en la base de datos
    await pool.query(
      `INSERT INTO products (name, description, price, category, rarity, stock, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        parseFloat(price),
        category,
        rarity || null,
        parseInt(stock),
        `/images/products/${req.file.filename}`
      ]
    );

    req.flash('success', '¡Producto agregado correctamente!');
    res.redirect('/products');
  } catch (err) {
    console.error('Error al agregar producto:', err);

    // Eliminar archivo subido si hubo error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error al eliminar archivo temporal:', unlinkErr);
      });
    }

    req.flash('error', err.message);
    res.redirect('/products/add');
  }
});

// Ruta para mostrar detalle de producto
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

// Eliminar producto por ID
router.post('/delete/:id', async (req, res) => {
  try {
    const [product] = await pool.query('SELECT image_url FROM products WHERE id = ?', [req.params.id]);

    if (product.length === 0) {
      req.flash('error', 'Producto no encontrado');
      return res.redirect('/products');
    }

    // Eliminar imagen del sistema de archivos
    const imagePath = path.join(__dirname, '..', 'public', product[0].image_url);
    fs.unlink(imagePath, (err) => {
      if (err) console.error('No se pudo eliminar la imagen:', err);
    });

    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    req.flash('success', 'Producto eliminado correctamente');
    res.redirect('/products');
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    req.flash('error', 'No se pudo eliminar el producto');
    res.redirect('/products');
  }
});

// Mostrar formulario para editar producto
router.get('/edit/:id', async (req, res) => {
  try {
    const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (product.length === 0) {
      req.flash('error', 'Producto no encontrado');
      return res.redirect('/products');
    }

    res.render('edit-product', {
      product: product[0],
      messages: {
        error: req.flash('error'),
        success: req.flash('success')
      }
    });
  } catch (err) {
    console.error('Error al obtener producto:', err);
    req.flash('error', 'Error al cargar el formulario');
    res.redirect('/products');
  }
});

// Procesar edición de producto
router.post('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, rarity, stock } = req.body;
    const [productData] = await pool.query('SELECT image_url FROM products WHERE id = ?', [req.params.id]);

    if (productData.length === 0) {
      req.flash('error', 'Producto no encontrado');
      return res.redirect('/products');
    }

    let image_url = productData[0].image_url;

    // Si se sube una nueva imagen, eliminar la anterior y actualizar URL
    if (req.file) {
      const oldImagePath = path.join(__dirname, '..', 'public', image_url);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error('No se pudo eliminar imagen anterior:', err);
      });

      image_url = `/images/products/${req.file.filename}`;
    }

    await pool.query(
      `UPDATE products SET name=?, description=?, price=?, category=?, rarity=?, stock=?, image_url=? WHERE id=?`,
      [name, description, price, category, rarity, stock, image_url, req.params.id]
    );

    req.flash('success', 'Producto actualizado correctamente');
    res.redirect('/products');
  } catch (err) {
    console.error('Error al editar producto:', err);
    req.flash('error', 'No se pudo editar el producto');
    res.redirect(`/products/edit/${req.params.id}`);
  }
});

module.exports = router;