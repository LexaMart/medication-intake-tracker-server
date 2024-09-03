import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { authRouter } from "./controllers/auth.controller";
import client from "./utills/database";
import dotenv from "dotenv";
import { medicationRouter } from "./controllers/medication.controller";

// import knex from "knex";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
client;

// const pg = knex({
//   client: "pg",
//   connection: {
//     host: config["DB_HOST"],
//     port: config["DB_PORT"],
//     user: config["DB_USER"],
//     database: config["DB_NAME"],
//     password: config["DB_PASSWORD"],
//     ssl: false,
//   },
// });

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(authRouter);
app.use(medicationRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
