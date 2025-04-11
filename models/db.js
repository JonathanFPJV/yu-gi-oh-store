const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root'
    });

    const dbName = process.env.DB_NAME || 'yu_gi_oh_store';

    // Verificar si la base de datos existe, si no, crearla
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Base de datos '${dbName}' verificada o creada.`);

    // Seleccionar la base de datos
    await connection.query(`USE \`${dbName}\``);

    // Crear tabla de productos si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category ENUM('carta', 'booster', 'accesorio') NOT NULL,
        rarity VARCHAR(50),
        stock INT NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear tabla de pedidos si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        status ENUM('pendiente', 'procesando', 'completado') DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tablas verificadas o creadas correctamente.');

    await connection.end();
  } catch (error) {
    console.error('Error al verificar o crear la base de datos y tablas:', error);
    process.exit(1); // Salir de la aplicación si ocurre un error
  }
})();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'yu_gi_oh_store',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;