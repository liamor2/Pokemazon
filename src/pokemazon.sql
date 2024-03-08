-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS pokemazon;

-- Use the pokemazon database
USE pokemazon;

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role INT NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_list JSON NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create and admin user if it doesn't exist
INSERT INTO users (id , name, email, role, password) VALUES (1, 'admin', 'admin@pokemazon.net', 1, 'passadmin');