const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const HttpError = require("./models/HttpError");
const connectDB = require("./config/db");
const ondc = require("ondc-node");

// import handlers for the ONDC API calls
const handlers = require("./handlers");

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
  console.log("Tech HEXBit -> Test Route Working");
  res.send("Hello World 🚀");
});

// route
//      || test
app.use("/api/Core", require("./routes/Core"));
app.use("/api/User", require("./routes/Login"));
app.use("/api/confirmwithCOD", require("./routes/confirmwithCOD"));
app.use("/api/update", require("./routes/update"));
app.use("/api/updatedsearch4cat", require("./routes/updatedsearch4cat"));
app.use("/api/update", require("./routes/update"));
app.use("/api/PostOrder", require("./routes/PostOrder"));
app.use(
  "/api/ststuswithinit&confirm",
  require("./routes/ststuswithinit&confirm")
);
//      || ONDC
app.use("/search", require("./routes/ONDC/search"));
app.use("/select", require("./routes/ONDC/select"));
app.use("/init", require("./routes/ONDC/init"));
app.use("/update", require("./routes/ONDC/update"));
app.use("/confirm", require("./routes/ONDC/confirm"));
app.use("/status", require("./routes/ONDC/status"));
app.use("/cancel", require("./routes/ONDC/cancel"));

//      || App
app.use("/api/App/onborading", require("./routes/App/onborading"));
app.use("/api/App/cart", require("./routes/App/cart"));
app.use("/api/App/Inventory", require("./routes/App/Inventory"));
app.use("/api/App/Order", require("./routes/App/Order"));
app.use("/api/App/Profile", require("./routes/App/Profile"));

// Use ONDC Middleware to implement ONDC APIs in one line
// You can pass custom APIs handlers
// if handler does not exist a fallback handler will be used

// app.use(
//   "/ondc",
//   ondc.Middleware({
//     on_search: handlers["onSearch"],
//     on_init: handlers["onInit"],
//   })
// );

// Route not found
app.use((req, res, next) => {
  console.log(req.url);
  return res.status(404).send("404 not found");
});

const port = process.env.PORT || 5000;

// listen
app.listen(port, () => {
  console.log("HEXBIT.IO Server is listining on port " + port);
});
