import { Services } from "../../services";
import { productsArray } from "../../consts";
import { Product } from "../../models";

const services = new Services();
const product = new Product();

const count = 5;

describe("Services Suite", () => {
  it("Should add a products array", async () => {
    const result = await services.addProducts(productsArray);
    const comparedTo = await product.getAllProducts();

    expect(result).toEqual(comparedTo);
  });

  it("Should fetch Top 5 most popular products", async () => {
    const comparedTo = await product.getAllProducts();
    const sortedArray = [...comparedTo].sort((a, b) => b.price - a.price);
    const result = await services.topExpensive(count);

    expect(result).toEqual(sortedArray);
  });

  it("Should fetch products with specific category", async () => {
    const comparedTo = await product.getAllProducts();
    const filteredProductsArray = comparedTo.filter(
      (row) => row.category === "Entertainment"
    );
    const result = await services.getProductsByCategory("Entertainment");

    expect(result).toEqual(filteredProductsArray);
  });
});
