import pool from "../database";
import { CreateOrderType, OrderType } from "../types";

export class Order {
  async CreateOrder(order: CreateOrderType): Promise<OrderType> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const result = await conn.query<OrderType>(sql, [
        order.status,
        order.user_id,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to create an order. ${error}`);
    }
  }

  async getOrders(): Promise<OrderType[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query<OrderType>(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't retrieve orders. ${error}`);
    }
  }

  async getOrderByID(id: OrderType["id"]): Promise<OrderType> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM orders WHERE id=$1";
      const result = await conn.query<OrderType>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No order found with this id. ${error}`);
    }
  }

  async DeleteOrder(id: OrderType["id"]): Promise<Record<"id", number>> {
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
