import { ServicesModel } from "../../services";
import { firstOrder, productsArray, firstUser } from "../../consts";
import { OrderModel, ProductModel, UserModel } from "../../models";
import pool from "../../database";

const services = new ServicesModel();
const product = new ProductModel();
const order = new OrderModel();
const user = new UserModel();

const count = 5;
let userID: number;
let orderID: number;

describe("Services Model Suite", () => {
  beforeAll(async () => {
    userID = (await user.createUser(firstUser)).id;
    orderID = (await order.createOrder({ ...firstOrder, user_id: userID })).id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql = `DELETE FROM orders;
      ALTER SEQUENCE orders_id_seq RESTART WITH 1;
      DELETE FROM products;
      ALTER SEQUENCE products_id_seq RESTART WITH 1;
      DELETE FROM users;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    conn.query(sql);
    conn.release();
  });

  it("Should add a products array", async () => {
    const result = await services.createProducts(productsArray);
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
