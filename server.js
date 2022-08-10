//global scope
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const app = express();

const userRouter = require("./routes/users");

const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
  })
);
app.use(express.json({ limit: "10mb" })); //maximal file json yanggn diterima ukuran 10 mb, kalo lebih server bakal kasih response error
app.use("/api/auth", userRouter);

(() => connectDB(app, port))(); //IFFE function
