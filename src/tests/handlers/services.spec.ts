import supertest from "supertest";
import { firstOrder, productsArray, firstUser } from "../../consts";
import pool from "../../database";
import app from "../../server";
import { Category } from "../../types";

const request = supertest(app);

const count = 3;
const category: Category = "Entertainment";
let userToken = "Bearer ";
let userID: number;
let orderID: number;

describe("Services Handler Suite", () => {
  beforeAll(async () => {
    const result = await request.post("/users").send(firstUser);
    userToken += result.body.token;
    userID = result.body.id;
    orderID = (await request.post("/orders").send(firstOrder)).body.id;
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

  it("Should create multiple products in array", async () => {
    const result = await request
      .post("/products/bulk")
      .set("Authorization", userToken)
      .send(productsArray);

    expect(result.statusCode).toBe(201);
  });

  it("Should fetch top expensive products by count", async () => {
    const result = await request.get(`/products/sort?count=${count}`);

    expect(result.statusCode).toBe(200);
  });

  it("Should fetch products by category", async () => {
    const result = await request.get(`/products/filter?category=${category}`);

    expect(result.statusCode).toBe(200);
  });

  it("Should fetch current orders by user id", async () => {
    const result = await request
      .get(`/orders/${userID}`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });

  it("Should place order (set to complete)", async () => {
    const result = await request
      .put(`/orders/${orderID}`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });

  it("Should fetch completed orders by user", async () => {
    const result = await request
      .get(`/orders/${userID}/completed`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });
});
