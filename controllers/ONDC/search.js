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
  console.log("TYPE -> " + req.body.message.intent.fulfillment.type);
  // console.log("Search Word -> ", req.body.message.intent.item.descriptor.name);

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
