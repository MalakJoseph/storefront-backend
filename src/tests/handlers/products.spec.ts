import supertest from "supertest";
import { firstProduct, userCredentials } from "../../consts";
import pool from "../../database";
import app from "../../server";

const request = supertest(app);

const productID = 1;
let userToken = "Bearer ";

describe("Products Handler Suite", () => {
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

  it("Should create a product sucessfully", async () => {
    const result = await request
      .post("/products")
      .set("Authorization", userToken)
      .send(firstProduct);

    expect(result.statusCode).toBe(201);
  });

  it("Should fetch all products sucessfully", async () => {
    const result = await request.get("/products");

    expect(result.statusCode).toBe(200);
  });

  it("Should fetch product by id sucessfully", async () => {
    const result = await request.get(`/products/show/${productID}`);

    expect(result.statusCode).toBe(200);
  });

  it("Should delete product by id sucessfully", async () => {
    const result = await request
      .delete(`/products/delete/${productID}`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });
});
