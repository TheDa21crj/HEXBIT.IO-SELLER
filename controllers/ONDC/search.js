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
  console.log(
    "Payment Type" +
      req.body.message.intent.payment["@ondc/org/buyer_app_finder_fee_type"]
  );
  console.log(
    "Payment Amount" +
      req.body.message.intent.payment["@ondc/org/buyer_app_finder_fee_amount"]
  );

  console.log("Location -> " + req.body.message.intent.fulfillment.location);
  // console.log("Delivery TYPE -> " + req.body.message.intent.fulfillment.type);
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
