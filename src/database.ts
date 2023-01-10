import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  NODE_ENV,
  DB_HOST,
  DB_NAME,
  DB_NAME_TEST,
  DB_USERNAME,
  DB_PASSWORD,
  PORT,
} = process.env;

const pool = new Pool({
  host: DB_HOST,
  database: NODE_ENV === "test" ? DB_NAME_TEST : DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  port: parseInt(PORT as string),
});

export default pool;
