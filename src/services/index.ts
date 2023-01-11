import pool from "../database";
import { Product } from "../models";
import {
  AddProductType,
  Category,
  OrderType,
  ProductType,
  UserType,
} from "../types";

const product = new Product();

export class Services {
  async addProducts(productsArray: AddProductType[]): Promise<ProductType[]> {
    try {
      const conn = await pool.connect();
      const result = await bulkUpload(productsArray);

      conn.release();

      return result;
    } catch (error) {
      throw new Error(`Sorry, bulk upload didn't go as expected. ${error}`);
    }
  }

  async topExpensive(count: number): Promise<ProductType[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products ORDER BY price DESC LIMIT $1";
      const result = await conn.query<ProductType>(sql, [count]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`No products found. ${error}`);
    }
  }

  async getProductsByCategory(category: Category): Promise<ProductType[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products WHERE category=$1";
      const result = await conn.query<ProductType>(sql, [category]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`No products found with this category. ${error}`);
    }
  }

  async currentOrdersByUser(user_id: UserType["id"]): Promise<OrderType[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM orders WHERE user_id=$1";
      const result = await conn.query<OrderType>(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`There are no active orders. ${error}`);
    }
  }

  async placeOrder(order_id: OrderType["id"]): Promise<OrderType> {
    try {
      const conn = await pool.connect();
      const sql =
        "UPDATE orders SET status='completed' WHERE id=$1 RETURNING *;";
      const result = await conn.query<OrderType>(sql, [order_id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong. ${error}`);
    }
  }

  async completedOrdersByUser(user_id: UserType["id"]): Promise<OrderType[]> {
    try {
      const conn = await pool.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=$1 AND status='completed'";
      const result = await conn.query<OrderType>(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`There are no completed orders by this user. ${error}`);
    }
  }
}

/**
 * Creates products with each instance of the array passed
 */
async function bulkUpload(
  productsArray: AddProductType[]
): Promise<ProductType[]> {
  const addedProducts = await Promise.all(
    productsArray.map(async (productToAdd) => {
      const result = await product.addProduct(productToAdd);
      return result;
    })
  );

  return addedProducts;
}
