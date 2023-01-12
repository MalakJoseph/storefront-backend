# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `'products/' [GET]`
- Show `'products/show/:id' [GET]`
- Create [token required] `'products/' [POST] (token)`
- Delete [token required] `'products/:id' [DELETE] (token)`
- Product bulk upload (args: array of products)[token required] `'products' [POST] (token)` **_HOT_**
- Top 5 most expensive products `'products?count=5' [GET]`
- Products by category (args: product category) `'products/:category' [GET]`

#### Users

- Index [token required] `'users/' [GET] (token)`
- Show [token required] `'users/:id' [GET] (token)`
- Create [token required] `'users/' [POST] (token)`
- Delete [token required] `'users/:id' [DELETE] (token)`

#### Orders

- Index [token required] `'orders/' [GET] (token)`
- Show [token required] `'orders/:id' [GET] (token)`
- Create [token required] `'orders/' [POST] (token)`
- Delete [token required] `'orders/:id' [DELETE] (token)`
- Current Orders by user (args: user id)[token required] `'orders/:user_id' [GET] (token)`
- Place Order (args: order id)[token required] `'orders/:order_id' [PUT] (token)` // to set status to `completed`
- Completed Orders by user (args: user id)[token required] `'orders/:user_id/completed' [GET] (token)`

#### Order Products

- Index [token required] `'/orders/:order_id' [GET]`
- Create [token required] `'/orders/:order_id/order-products/:order_product_id' [POST]`
- Update [token required] `'/orders/:order_id/order-products' [PUT]`
- Delete [token required] `'/orders/:order_id/order-products/:order_product_id' [DELETE]`

## Data Shapes

#### Product

```
products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50)
);
```

#### User

```
users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

#### Orders

```
orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Orders Products

```
order_products (
  id SERIAL PRIMARY KEY,
  quantity INTEGER DEFAULT 1,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE NOT NULL
);
```
