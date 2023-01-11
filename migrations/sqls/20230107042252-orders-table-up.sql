CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
