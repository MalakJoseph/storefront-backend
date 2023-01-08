import pool from "../database";
import { ProductType } from "../interfaces";

export class Product {
  async createProduct(product: Omit<ProductType, "id">): Promise<ProductType> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No product has been created. Error: ${error}`);
    }
  }

  async getAllProducts(): Promise<ProductType[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't retrieve products. Error: ${error}`);
    }
  }
}
