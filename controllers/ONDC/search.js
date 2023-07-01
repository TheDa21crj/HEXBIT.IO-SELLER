const { validationResult } = require("express-validator");

// models
const Seller = require("./../../models/Seller");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");

// Define the route for the /search API
const search = async (req, res) => {
  console.log(
    "------------------------------req.body------------------------------"
  );
  console.log("req.body.message");
  console.log(req.body.message);
  console.log("------------------------------------------------------------");
  console.log("req.body.context");
  console.log(req.body.context);

  res.status(200).json({
    message: {
      ack: {
        status: "ACK",
      },
    },
    error: {
      type: "CONTEXT-ERROR",
      code: "string",
      path: "string",
      message: "string",
    },
  });
};

exports.search = search;
