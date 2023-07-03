const { validationResult } = require("express-validator");
const axios = require("axios");

// models
const Seller = require("./../../models/Seller");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");

// Define the route for the /search API
const search = async (req, res) => {
  console.log(
    "------------------------------req.body------------------------------"
  );

  const { context, message } = req.body;

  const response = {
    context: {
      domain: context.domain,
      country: context.country,
      city: context.city,
      action: "on_search",
      core_version: context.core_version,
      bap_id: context.bap_id,
      bap_uri: context.bap_uri,
      transaction_id: context.transaction_id,
      message_id: context.message_id,
      timestamp: context.timestamp,
      ttl: context.ttl,
    },
    message: {
      sellers: "std:080",
      finder_fee: 106,
    },
  };

  const responseData = await axios.post(process.env.SEARCH, response, {
    headers: {
      Authorization: process.env.Authorization,
    },
  });

  console.log(responseData);

  // console.log("Payment Type -> " + message.intent.payment["@ondc/org/buyer_app_finder_fee_type"]);
  // console.log("Payment Amount -> " + message.intent.payment["@ondc/org/buyer_app_finder_fee_amount"]);
  // console.log("GPS -> " + message.intent.fulfillment.end.location.gps);
  // console.log("Delivery TYPE -> " + message.intent.fulfillment.type);
  // console.log("Search Word -> ", message.intent.item.descriptor.name);

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
