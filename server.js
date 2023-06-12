const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const HttpError = require("./models/HttpError");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// connect to DB
connectDB();

app.use(bodyParser.json());

// cros
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,OPTIONS"
  );

  next();
});

// test route
app.get("/7SYS9SrnCNXvzxm0", (req, res) => {
  res.send("Hello World");
});

// route
//      || ondc
app.use("/api/Core", require("./routes/Core"));
app.use("/api/User", require("./routes/Login"));
app.use("/api/confirmwithCOD", require("./routes/confirmwithCOD"));
app.use("/api/updatedsearch4cat", require("./routes/updatedsearch4cat"));
app.use("/api/PostOrder", require("./routes/PostOrder"));
app.use(
  "/api/ststuswithinit&confirm",
  require("./routes/ststuswithinit&confirm")
);

//      || App
app.use("/api/App/onborading", require("./routes/App/onborading"));
app.use("/api/App/cart", require("./routes/App/cart"));

// Route not found
app.use((req, res, next) => {
  console.log(req.url);
  const error = new HttpError("Route not found", 404);
  return next(error);
});

const port = process.env.PORT || 5000;

// listen
app.listen(port, () => {
  console.log("HEXBIT.IO Server is listining on port " + port);
});
