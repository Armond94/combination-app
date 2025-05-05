-- Create database if not exists
CREATE DATABASE IF NOT EXISTS skillex_combinations;

USE skillex_combinations;

-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create responses table
CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create combinations table
CREATE TABLE IF NOT EXISTS combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response_id INT NOT NULL,
    combination JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (response_id) REFERENCES responses(id)
);

-- Create indexes
CREATE INDEX idx_items_name ON items(name);
CREATE INDEX idx_combinations_response_id ON combinations(response_id); 