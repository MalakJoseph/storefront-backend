import { AddProductType, CreateUserType } from "../types";

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

const userCredentials: CreateUserType = {
  firstname: "Malak",
  lastname: "Joseph",
  password: "123123",
};

export {
  firstProduct,
  secondProduct,
  thirdProduct,
  fourthProduct,
  fifthProduct,
  productsArray,
  userCredentials,
};
