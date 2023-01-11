CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20),
  user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
  created_at timestamp default current_timestamp
);
