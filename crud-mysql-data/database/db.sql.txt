-- to create a new database
CREATE DATABASE nodejsdata;

-- to use database
use nodejsdata;

-- creating a new table
CREATE TABLE datos (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  valor VARCHAR(10) NOT NULL
);

-- to show all tables
show tables;

-- to describe table
describe datos;

ALTER TABLE datos
ADD COLUMN valor1 VARCHAR(10) NOT NULL AFTER valor;

