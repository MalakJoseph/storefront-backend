import pool from "../database";
import { CreateProduct, Product } from "../types";

export class ProductModel {
  async createProduct(product: CreateProduct): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query<Product>(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to create a product. ${error}`);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query<Product>(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't retrieve products. ${error}`);
    }
  }

  async getProductByID(id: Product["id"]): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const result = await conn.query<Product>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No product found with this id. ${error}`);
    }
  }

  async deleteProduct(id: Product["id"]): Promise<Record<"id", number>> {
    try {
      const conn = await pool.connect();
      const sql = "DELETE FROM products WHERE id=$1 RETURNING id";
      const result = await conn.query<Record<"id", number>>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete this product. ${error}`);
    }
  }
}
