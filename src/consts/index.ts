import { CreateProduct, CreateOrder, CreateUser } from "../types";

// Product

const firstProduct: CreateProduct = {
  name: "Product A",
  price: 500,
  category: "Entertainment",
};
const secondProduct: CreateProduct = {
  name: "Product B",
  price: 2000,
  category: "Jewelry",
};
const thirdProduct: CreateProduct = {
  name: "Product C",
  price: 3400,
  category: "Jewelry",
};
const fourthProduct: CreateProduct = {
  name: "Product D",
  price: 600,
  category: "Entertainment",
};
const fifthProduct: CreateProduct = {
  name: "Product E",
  price: 700,
  category: "Entertainment",
};

const productsArray = [
  firstProduct,
  secondProduct,
  thirdProduct,
  fourthProduct,
  fifthProduct,
];

// User

const firstUser: CreateUser = {
  firstname: "Malak",
  lastname: "Joseph",
  password: "123123",
};

// Order

const firstOrder: CreateOrder = {
  user_id: 1,
  status: "active",
};
const secondOrder: CreateOrder = {
  user_id: 1,
};
const thirdOrder: CreateOrder = {
  user_id: 1,
  status: "completed",
};

export {
  firstProduct,
  secondProduct,
  thirdProduct,
  fourthProduct,
  fifthProduct,
  productsArray,
  firstUser,
  firstOrder,
  secondOrder,
  thirdOrder,
};
