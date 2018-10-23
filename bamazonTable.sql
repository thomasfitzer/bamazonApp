
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
  
  item_id INT NOT NULL AUTO_INCREMENT,

  product_name VARCHAR(255),

  department_name VARCHAR(255),
 
  price DECIMAL(55,2) NULL,

  stock_quantity INT,

  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("beer", "alcohol", 12.00, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gin", "alcohol", 17.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("whisky", "alcohol", 22.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chew", "tobacco", 8.50, 104);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cigarettes", "tobacco", 9.00, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("snus", "tobacco", 6.75, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pistol", "firearms", 200.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rifle", "firearms", 500.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shotgun", "firearms", 350.00, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bazooka", "firearms", 1500.00, 1);








