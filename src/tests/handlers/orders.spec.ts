import supertest from "supertest";
import { firstOrder, firstUser } from "../../consts";
import pool from "../../database";
import app from "../../server";

const request = supertest(app);

const orderID = 1;
let userID: number;

describe("Orders Handler Suite", () => {
  beforeAll(async () => {
    userID = (await request.post("/users").send(firstUser)).body.id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql = `DELETE FROM orders;
      ALTER SEQUENCE orders_id_seq RESTART WITH 1;
      DELETE FROM users;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    conn.query(sql);
    conn.release();
  });

  it("Should create an order successfully", async () => {
    const result = await request
      .post("/orders")
      .send({ ...firstOrder, user_id: userID });

    expect(result.statusCode).toBe(201);
  });

  it("Should fetch all orders successfully", async () => {
    const result = await request.get("/orders");

    expect(result.statusCode).toBe(200);
  });

  it("Should fetch order by id successfully", async () => {
    const result = await request.get(`/orders/${orderID}`);

    expect(result.statusCode).toBe(200);
  });

  it("Should delete order by id successfully", async () => {
    const result = await request.delete(`/orders/${orderID}`);

    expect(result.statusCode).toBe(200);
  });
});
