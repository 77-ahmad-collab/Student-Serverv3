const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
var cors = require("cors");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = require("./Rout/router");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", router);
app.use(
  cors({
    credentials: true,
    allowedHeaders: true,
    exposedHeaders: ["Content-Length", "X-FOO", "X-BAR"],
  })
);
app.listen(PORT, () => {
  console.log("app is listening on port 5000");
});
