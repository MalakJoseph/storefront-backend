# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `'products/' [GET]`
- Show `'products/:id' [GET]`
- Create [token required] `'products/' [POST] (token)`
- Top 5 most popular products `'products?count=5' [GET]`
- Products by category (args: product category) `'products/:cateogry' [GET]`

#### Users

- Index [token required] `'users/' [GET] (token)`
- Show [token required] `'users/:id' [GET] (token)`
- Create N[token required] `'users/' [POST] (token)`

#### Orders

- Current Order by user (args: user id)[token required] `'orders/:user_id' [GET] (token)`
- Completed Orders by user (args: user id)[token required] `'orders/:user_id?completed=true' [GET] (token)`

## Data Shapes

#### Product

- id
- name
- price
- category

```
products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50)
);
```

#### User

- id
- firstName
- lastName
- password

```
users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
)
```

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER FOREIGN KEY REFERENCES products(id),
  quantity INTEGER,
  user_id INTEGER FOREIGN KEY REFERENCES users(id),
  status VARCHAR(20)
)
```
