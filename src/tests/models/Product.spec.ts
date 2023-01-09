import { Product } from "../../models";
import { productPrototype } from "../../consts";

const product = new Product();

let productID: number;

describe("Product Model Suite", () => {
  it("Should add a product", async () => {
    const result = await product.addProduct(productPrototype);
    productID = result.id;
    expect(result).toEqual({ ...productPrototype, id: productID });
  });

  it("Should fetch all products", async () => {
    const result = await product.getProducts();
    expect(result).toContain({ ...productPrototype, id: productID });
  });

  it("Should fetch product by id", async () => {
    const result = await product.getProductByID(productID);
    expect(result).toEqual({ ...productPrototype, id: productID });
  });

  it("Should delete product by id", async () => {
    const result = await product.deleteProduct(productID);
    expect(result.id).toBe(productID);
  });
});
