import { Product } from "../../models/Product";

const product = new Product();
let productID: number;

describe("Product Model Suites", () => {
  it("Should create a product", async () => {
    const productInfo = {
      name: "Ticket",
      price: 10,
      category: "Entertainment",
    };
    const result = await product.createProduct(productInfo);
    productID = result.id;

    expect(result).toEqual({ ...productInfo, id: productID });
  });
});
