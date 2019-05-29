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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('shirt', 'apperal', 9.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('socks', 'apperal', 4.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('hammer', 'hardware', 11.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('nails', 'hardware', 1.99, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('saw', 'hardware', 14.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('bread', 'grocery', 5.99, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('honey', 'grocery', 11.99, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('milk', 'grocery', 2.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('apples', 'grocery', 4.99, 80);