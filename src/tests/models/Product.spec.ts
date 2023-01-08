import { Product } from "../../models/Product";
import { AddProductType, ProductType } from "../../types";

const product = new Product();

let productID = 1;
const productToAdd: AddProductType = {
  name: "Ticket",
  price: 500,
  category: "Entertainment",
};
const fullProduct: ProductType = { ...productToAdd, id: productID };

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

  it("Should fetch products with specific id", async () => {
    const result = await product.getProductByID(productID);

    expect(result).toEqual(fullProduct);
  });

  it("Should fetch Top 5 most popular products", async () => {
    const anotherProduct = {
      id: 2,
      name: "Watch",
      price: 2000,
      category: "Jewelry",
    };
    await product.createProduct(anotherProduct);
    const result = await product.topExpensive(5);

    expect(result).toEqual([anotherProduct, fullProduct]);
  });

  it("Should fetch products with specific category", async () => {
    const result = await product.getProductsByCategory("Entertainment");

    expect(result).toEqual([fullProduct]);
  });
});
