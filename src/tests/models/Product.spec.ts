import { ProductModel } from "../../models";
import { firstProduct } from "../../consts";

const product = new ProductModel();

let productID: number;

describe("Product Model Suite", () => {
  it("Should create a product", async () => {
    const result = await product.createProduct(firstProduct);
    productID = result.id;
    expect(result).toEqual({ ...firstProduct, id: productID });
  });

  it("Should fetch all products", async () => {
    const result = await product.getProducts();
    expect(result).toContain({ ...firstProduct, id: productID });
  });

  it("Should fetch product by id", async () => {
    const result = await product.getProductByID(productID);
    expect(result).toEqual({ ...firstProduct, id: productID });
  });

  it("Should delete product by id", async () => {
    const result = await product.deleteProduct(productID);
    expect(result.id).toBe(productID);
  });
});
