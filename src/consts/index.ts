import { AddProductType, CreateOrderType, CreateUserType } from "../types";

// Product

const firstProduct: AddProductType = {
  name: "Product A",
  price: 500,
  category: "Entertainment",
};
const secondProduct: AddProductType = {
  name: "Product B",
  price: 2000,
  category: "Jewelry",
};
const thirdProduct: AddProductType = {
  name: "Product C",
  price: 3400,
  category: "Jewelry",
};
const fourthProduct: AddProductType = {
  name: "Product D",
  price: 600,
  category: "Entertainment",
};
const fifthProduct: AddProductType = {
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

const userCredentials: CreateUserType = {
  firstname: "Malak",
  lastname: "Joseph",
  password: "123123",
};

// Order

const firstOrder: CreateOrderType = {
  user_id: 1,
  status: "active",
};
const secondOrder: CreateOrderType = {
  user_id: 1,
};
const thirdOrder: CreateOrderType = {
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
  userCredentials,
  firstOrder,
  secondOrder,
  thirdOrder,
};
