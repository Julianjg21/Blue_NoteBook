import { createConnection } from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./configs.env" });

//create connection to the database
const db = await createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connection to the database established!!");
});

export default db;
