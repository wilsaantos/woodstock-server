import express from "express";
import authController from "./controllers/authController";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", authController);

app.listen(3000, () => {
  console.log("Server is running");
});
