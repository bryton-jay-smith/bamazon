use bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price DECIMAL (5,2),
stock_quantity INT
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('pants', 'apperal', 11.99, 60);