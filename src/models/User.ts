import pool from "../database";
import { CreateUserType, UserType } from "../types";

export class User {
  async createUser(user: CreateUserType): Promise<UserType> {
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
      throw new Error(`Failed to create a user. ${error}`);
    }
  }

  async getUsers(): Promise<Partial<UserType>[]> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query<Partial<UserType>>(sql);

      conn.release();

      result.rows.forEach((row) => {
        delete row.password;
      });

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't retrieve users. ${error}`);
    }
  }

  async getUserByID(userID: UserType["id"]): Promise<Partial<UserType>> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users WHERE id=$1";
      const result = await conn.query<Partial<UserType>>(sql, [userID]);

      conn.release();

      delete result.rows[0].password;

      return result.rows[0];
    } catch (error) {
      throw new Error(`No user found with this id. ${error}`);
    }
  }

  async deleteUser(id: UserType["id"]): Promise<Record<"id", number>> {
    try {
      const conn = await pool.connect();
      const sql = "DELETE FROM users WHERE id=$1 RETURNING id";
      const result = await conn.query<Record<"id", number>>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete this user. ${error}`);
    }
  }
}
