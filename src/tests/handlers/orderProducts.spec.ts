import supertest from "supertest";
import { firstOrder, firstProduct, firstUser } from "../../consts";
import pool from "../../database";
import app from "../../server";

const request = supertest(app);

const quantity = 3;
let orderID: number;
let orderProductID: number;
let productID: number;
let userID: number;
let userToken = "Bearer ";

describe("Orders_Products Handler Suite", () => {
  beforeAll(async () => {
    const user = await request.post("/users").send(firstUser);
    userID = user.body.id;
    userToken += user.body.token;
    productID = (
      await request
        .post("/products")
        .set("Authorization", userToken)
        .send(firstProduct)
    ).body.id;
    orderID = (
      await request.post("/orders").send({ ...firstOrder, user_id: userID })
    ).body.id;
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

  it("Should add products to order sucessfully", async () => {
    const result = await request
      .post(`/orders/${orderID}`)
      .set("Authorization", userToken)
      .send({ product_id: productID, quantity });
    orderProductID = result.body.id;

    expect(result.statusCode).toBe(201);
  });

  it("Should fetch all products from order successfully", async () => {
    const result = await request
      .get(`/orders/${orderID}/order-products`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });

  it("Should update quantity of order's product successfully", async () => {
    const result = await request
      .put(`/orders/${orderID}/order-products/${orderProductID}`)
      .set("Authorization", userToken)
      .send({ quantity });

    expect(result.statusCode).toBe(200);
  });

  it("Should delete order by id successfully", async () => {
    const result = await request
      .delete(`/orders/${orderID}/order-products/${orderProductID}`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });
});
