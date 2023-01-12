import pool from "../database";
import { CreateOrder, Order } from "../types";

export class OrderModel {
  async createOrder(order: CreateOrder): Promise<Order> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const result = await conn.query<Order>(sql, [
        order.user_id,
        order.status,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to create an order. ${error}`);
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query<Order>(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't retrieve orders. ${error}`);
    }
  }

  async getOrderByID(id: Order["id"]): Promise<Order> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM orders WHERE id=$1";
      const result = await conn.query<Order>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No order found with this id. ${error}`);
    }
  }

  async deleteOrder(id: Order["id"]): Promise<Record<"id", number>> {
    try {
      const conn = await pool.connect();
      const sql = "DELETE FROM orders WHERE id=$1 RETURNING id";
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete this order. ${error}`);
    }
  }
}
