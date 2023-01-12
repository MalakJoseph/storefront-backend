import pool from "../database";
import { AddOrderProducts, OrderProducts, UpdateOrderProducts } from "../types";

export class OrderProductsModel {
  async addOrderProducts(
    orderProducts: AddOrderProducts
  ): Promise<OrderProducts> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
      const { order_id, product_id, quantity } = orderProducts;
      const result = await conn.query<OrderProducts>(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product to order: ${err}`);
    }
  }

  async getOrderProducts(order_id: number): Promise<OrderProducts[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM order_products WHERE order_id=$1;";
      const result = await conn.query<OrderProducts>(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products from order: ${err}`);
    }
  }

  async updateOrderProducts(
    orderProducts: UpdateOrderProducts
  ): Promise<OrderProducts> {
    try {
      const conn = await pool.connect();
      const sql =
        "UPDATE order_products SET quantity=$1 WHERE id=$2 RETURNING *";
      const { quantity, id } = orderProducts;
      const result = await conn.query<OrderProducts>(sql, [quantity, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product: ${err}`);
    }
  }

  async deleteOrderProducts(id: number): Promise<OrderProducts> {
    try {
      const conn = await pool.connect();
      const sql = "DELETE FROM order_products WHERE id=$1 RETURNING *;";
      const result = await conn.query<OrderProducts>(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order product: ${err}`);
    }
  }
}
