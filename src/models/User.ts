import pool from "../database";
import { AddUserType } from "../types";

export class User {
  async addUser(user: AddUserType) {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.password,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to create a user. Error ${error}`);
    }
  }
}
