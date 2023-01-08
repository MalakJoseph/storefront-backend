import { Product } from "../../models/Product";

const product = new Product();

let productID: number = 1;
const productToAdd = {
  name: "Ticket",
  price: 10,
  category: "Entertainment",
};
const fullProduct = { ...productToAdd, id: productID };

describe("Product Model Suite", () => {
  it("Should create a product", async () => {
    const result = await product.createProduct(productToAdd);
    productID = result.id;

    expect(result).toEqual(fullProduct);
  });

  it("Should fetch all products", async () => {
    const result = await product.getAllProducts();

    expect(result).toEqual([fullProduct]);
  });
});
