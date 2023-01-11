CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity INTEGER DEFAULT 1,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL
);
