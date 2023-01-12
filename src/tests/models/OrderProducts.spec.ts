import {
  OrderModel,
  OrderProductsModel,
  ProductModel,
  UserModel,
} from "../../models";
import { firstOrder, firstProduct, firstUser } from "../../consts";
import pool from "../../database";

const order = new OrderModel();
const orderProducts = new OrderProductsModel();
const product = new ProductModel();
const user = new UserModel();

const quantity = 3;
let orderID: number;
let orderProductsID: number;
let productID: number;
let userID: number;

describe("Order_Product Model Suite", () => {
  beforeAll(async () => {
    userID = (await user.createUser(firstUser)).id;
    productID = (await product.createProduct(firstProduct)).id;
    orderID = (await order.createOrder({ ...firstOrder, user_id: userID })).id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql = `DELETE FROM orders;
    ALTER SEQUENCE orders_id_seq RESTART WITH 1;
    DELETE FROM order_products;
    ALTER SEQUENCE order_products_id_seq RESTART WITH 1;
    DELETE FROM products;
    ALTER SEQUENCE products_id_seq RESTART WITH 1;
    DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    conn.query(sql);
    conn.release();
  });

  it("Should add products to order", async () => {
    const orderProductsData = {
      order_id: orderID,
      product_id: productID,
      quantity,
    };
    const result = await orderProducts.addOrderProducts(orderProductsData);
    orderProductsID = result.id;

    expect(result).toEqual({ ...orderProductsData, id: orderProductsID });
  });

  it("Should fetch all products from order", async () => {
    const orderProductsData = {
      order_id: orderID,
      product_id: productID,
      quantity,
    };
    const result = await orderProducts.getOrderProducts(orderID);

    expect(result).toContain({ ...orderProductsData, id: orderProductsID });
  });

  it("Should update quantity of order's product", async () => {
    const updatedQuantity = 5;
    const orderProductsData = {
      order_id: orderID,
      product_id: productID,
      quantity,
    };
    const result = await orderProducts.updateOrderProducts({
      ...orderProductsData,
      id: orderProductsID,
      quantity: updatedQuantity,
    });

    expect(result).toEqual({
      ...orderProductsData,
      id: orderProductsID,
      quantity: updatedQuantity,
    });
  });

  it("Should delete order by id", async () => {
    const result = await orderProducts.deleteOrderProducts(orderProductsID);
    expect(result.id).toBe(orderProductsID);
  });
});
