const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch(() => console.log("Database is not connected"));
