import { Services } from "../../services";
import { firstOrder, productsArray, userCredentials } from "../../consts";
import { Order, Product, User } from "../../models";
import pool from "../../database";

const services = new Services();
const product = new Product();
const order = new Order();
const user = new User();

const count = 5;
let userID: number;
let orderID: number;

describe("Services Suite", () => {
  beforeAll(async () => {
    userID = (await user.createUser(userCredentials)).id;
    orderID = (await order.CreateOrder({ ...firstOrder, user_id: userID })).id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      "DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;";
    conn.query(sql);
    conn.release();
  });

  it("Should add a products array", async () => {
    const result = await services.addProducts(productsArray);
    const comparedTo = await product.getProducts();

    expect(result).toEqual(comparedTo);
  });

  it("Should fetch Top 5 most popular products", async () => {
    const allProducts = await product.getProducts();
    const sortedProducts = [...allProducts].sort((a, b) => b.price - a.price);
    const result = await services.topExpensive(count);

    expect(result).toEqual(sortedProducts);
  });

  it("Should fetch products with specific category", async () => {
    const allProducts = await product.getProducts();
    const filteredProducts = allProducts.filter(
      (row) => row.category === "Entertainment"
    );
    const result = await services.getProductsByCategory("Entertainment");

    expect(result).toEqual(filteredProducts);
  });

  it("Should fetch current orders by user id", async () => {
    const orders = await services.currentOrdersByUser(userID);
    let isOrdersBelongToUser = true;

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].user_id !== userID) {
        isOrdersBelongToUser = false;
        return;
      }
    }

    expect(isOrdersBelongToUser).toBeTrue();
  });

  it("Should update order status to completed", async () => {
    const orders = await services.placeOrder(orderID);

    expect(orders.status).toBe("completed");
  });

  it("Should fetch completed orders by user id", async () => {
    const orders = await services.completedOrdersByUser(userID);
    let isCompletedOrders = true;

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status !== "completed") {
        isCompletedOrders = false;
        return;
      }
    }

    expect(isCompletedOrders).toBeTrue();
  });
});
