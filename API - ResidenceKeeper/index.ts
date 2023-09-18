import express from "express";
import { createServer } from "http";
import api from "./api";
import { connection } from "./api/config/database";
import cors from "cors";
import CategoryHelper from "./api/models/category/helpers";
import { HomeHelper } from "./api/models/home/helpers";
import PaymentHelper from "./api/models/payment/helpers";
import { UserHelper } from "./api/models/user/helpers";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", api);

const server = createServer(app);
connection()
  .then(() => {
    server.listen("8080", () => {
      afterStartup();
      console.log("API listening on port 8080");
    });
  })
  .catch((error: any) => {
    console.error("DB Error", error);
  });

function afterStartup() {
  try {
    console.log("API started ... loading data");
    UserHelper.importUsers();
    HomeHelper.importHomes();
    CategoryHelper.importCategories();
    PaymentHelper.importPayments();
  } catch (error) {
    console.error("Error while loading data", error);
  }
}

function beforeShutdown() {
  try {
    console.log("API shutting down ... saving data");
    UserHelper.exportUsers();
    CategoryHelper.exportCategories();
    HomeHelper.exportHomes();
    PaymentHelper.exportPayments();
  } catch (error) {
    console.error("Error while saving data", error);
  }
}

process.on("SIGINT", () => {
  beforeShutdown();
  process.exit(0);
});
