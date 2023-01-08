import { Product } from "../../models";
import { productPrototype } from "../../consts";

const product = new Product();

const productID = 1;
const fullProduct = { ...productPrototype, id: productID };

describe("Product Model Suite", () => {
  it("Should add a product", async () => {
    const result = await product.addProduct(productPrototype);
    expect(result).toEqual(fullProduct);
  });

  it("Should fetch all products", async () => {
    const result = await product.getAllProducts();
    expect(result).toEqual([fullProduct]);
  });

  it("Should fetch product with specific id", async () => {
    const result = await product.getProductByID(productID);
    expect(result).toEqual(fullProduct);
  });

  it("Should delete product with specific id", async () => {
    const result = await product.deleteProduct(productID);
    expect(result.id).toEqual(productID);
  });
});
