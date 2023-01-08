import { AddProductType } from "../types";

const productPrototype: AddProductType = {
  name: "Product 0",
  price: 100,
  category: "Entertainment",
};
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

export {
  productPrototype,
  firstProduct,
  secondProduct,
  thirdProduct,
  fourthProduct,
  fifthProduct,
  productsArray,
};
