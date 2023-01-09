import pool from "../database";
import { Product } from "../models";
import { AddProductType, Category, ProductType } from "../types";

const product = new Product();

export class Services {
  async addProducts(productsArray: AddProductType[]): Promise<ProductType[]> {
    try {
      const conn = await pool.connect();
      const result = await addProductsHandler(productsArray);

      conn.release();

      return result;
    } catch (error) {
      throw new Error(
        `Sorry, bulk upload didn't go as expected. Error: ${error}`
      );
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
      throw new Error(`Feature needs some fixes. Error: ${error}`);
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
      throw new Error(`No products found with this category. Error: ${error}`);
    }
  }
}

// until moving to handlers
async function addProductsHandler(
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
