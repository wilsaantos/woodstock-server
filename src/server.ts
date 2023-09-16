import express from "express";
import authController from "./controllers/authController";
import bodyParser from "body-parser";
import cors from "cors";
import customerController from "./controllers/customerController";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || "3000";

app.use("/auth", authController);
app.use("/customer", customerController);

app.listen(parseInt(port), () => {
  console.log("Server is running");
});
