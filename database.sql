-- Crear base de datos
CREATE DATABASE IF NOT EXISTS yu_gi_oh_store;
USE yu_gi_oh_store;

-- Tabla de productos
CREATE TABLE products (
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

-- Tabla de pedidos
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status ENUM('pendiente', 'procesando', 'completado') DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO products (name, description, price, category, rarity, stock, image_url) VALUES
('Dark Magician', 'El legendario mago oscuro', 24.99, 'carta', 'Ultra Rare', 15, 'dark-magician.jpg'),
('Booster Pack Legendary Duelists', 'Sobre con 5 cartas aleatorias', 4.99, 'booster', NULL, 50, 'booster-legendary.jpg'),
('Sleeves Blue Eyes', 'Protectores de cartas tema Blue Eyes', 9.99, 'accesorio', NULL, 30, 'sleeves-blue.jpg');