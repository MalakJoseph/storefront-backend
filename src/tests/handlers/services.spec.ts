import supertest from "supertest";
import { productsArray, userCredentials } from "../../consts";
import pool from "../../database";
import app from "../../server";
import { Category } from "../../types";

const request = supertest(app);

const count = 3;
const category: Category = "Entertainment";
let userToken = "Bearer ";

describe("Services Suite", () => {
  beforeAll(async () => {
    const result = await request.post("/users").send(userCredentials);
    userToken += result.body.token;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      "DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;";
    conn.query(sql);
    conn.release();
  });

  it("Should add multiple products in array", async () => {
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
});
