CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  quantity INTEGER DEFAULT 1,
  user_id INTEGER,
  status VARCHAR(20),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
