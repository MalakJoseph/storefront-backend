import pool from "../database";
import { AddProductType, ProductType } from "../types";

export class Product {
  async addProduct(product: AddProductType): Promise<ProductType> {
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
      throw new Error(`No product has been added. Error: ${error}`);
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

  async getProductByID(id: number): Promise<ProductType> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No product found with this id. Error: ${error}`);
    }
  }

  async deleteProduct(id: number): Promise<Record<"id", number>> {
    try {
      const conn = await pool.connect();
      const sql = "DELETE FROM products WHERE id=$1 RETURNING id";
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No product found with this id. Error: ${error}`);
    }
  }
}
