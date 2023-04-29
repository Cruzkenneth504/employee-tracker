--create table if doesn't exist
DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

USE departments_db;
--deparment table
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);
--roles table
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title_name VARCHAR(30) NOT NULL,
  salary_decimal DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
--Employees table
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
