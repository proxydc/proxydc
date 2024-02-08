const Pool = require("pg").Pool;
require("dotenv").config();
const express = require("express");
const app = express();

const pool =
  app.get("env") == "development"
    ? new Pool({
        host: "localhost",
        port: 5432,
        database: "postgres",
        user: "postgres",
        password: "Proxiad2024*!",
      })
    : new Pool({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
      });
pool.connect((err) => {
  if (err) {
    console.log(
      "connection db failed." +
        err + "USER: "+
        pool.user +
        " Environment: " +
        app.get("env")
    );
  } else {
    console.log("connection db success!");
  }
});

module.exports = pool;
