import supertest from "supertest";
import { firstOrder, userCredentials } from "../../consts";
import pool from "../../database";
import app from "../../server";

const request = supertest(app);

const orderID = 1;
let userID: number;

describe("Orders Handler Suite", () => {
  beforeAll(async () => {
    userID = (await request.post("/users").send(userCredentials)).body.id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      "DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;";
    conn.query(sql);
    conn.release();
  });

  it("Should create an order sucessfully", async () => {
    const result = await request
      .post("/orders")
      .send({ ...firstOrder, user_id: userID });

    expect(result.statusCode).toBe(201);
  });

  it("Should fetch all orders sucessfully", async () => {
    const result = await request.get("/orders");

    expect(result.statusCode).toBe(200);
  });

  it("Should fetch order by id sucessfully", async () => {
    const result = await request.get(`/orders/show/${orderID}`);

    expect(result.statusCode).toBe(200);
  });

  it("Should delete order by id sucessfully", async () => {
    const result = await request.delete(`/orders/delete/${orderID}`);

    expect(result.statusCode).toBe(200);
  });
});
