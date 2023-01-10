import pool from "../database";
import { SignupType, UserType } from "../types";

export class User {
  async createUser(user: SignupType): Promise<UserType> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query<UserType>(sql, [
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

  async getUsers(): Promise<UserType[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query<UserType>(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't retrieve users. Error: ${error}`);
    }
  }

  async getUserByID(userID: UserType["id"]): Promise<UserType> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users WHERE id=$1";
      const result = await conn.query<UserType>(sql, [userID]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No user found with this id. Error: ${error}`);
    }
  }
}
