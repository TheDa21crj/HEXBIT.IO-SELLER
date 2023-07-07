const { validationResult } = require("express-validator");
const axios = require("axios");

// models
const Seller = require("./../../models/Seller");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");

// Define the route for the /search API
const search = async (req, res) => {
  const { context, message } = req.body;

  const currentDate = new Date();
  const timestamp = currentDate.toISOString();
  console.log(timestamp);

  const response = {
    // message: {
    id: "item_1",
    descriptor: {
      name: "Rishav item 1",
    },
    location_id: "Eiosys_location",
    price: {
      currency: "INR",
      value: "40.0",
    },
    matched: true,
    provider_details: {
      id: "eiosys1",
      descriptor: {
        name: "Rishav Store 1",
      },
    },
    location_details: {
      id: "Eiosys_location",
      gps: "19.23587,73.1311240000001",
    },
    category_details: {},
    fulfillment_details: {},
    context: {
      domain: "nic2004:52110",
      country: "IND",
      city: "std:*",
      action: "on_search",
      core_version: "1.1.0",
      bap_id: "buyer-app.ondc.org",
      bap_uri: "https://buyer-app.ondc.org/protocol/v1",
      bpp_id: "techondc.hexbit.io",
      bpp_uri: "https://techondc.hexbit.io/",
      transaction_id: context.transaction_id,
      message_id: context.message_id,
      timestamp,
    },
    bpp_details: {
      name: "Shop Eiosys",
      bpp_id: "techondc.hexbit.io",
    },
    quantity: {
      available: {
        count: 0,
      },
      maximum: {
        count: 0,
      },
    },
  };

  try {
    const responseData = await axios.post(
      "https://pilot-gateway-1.beckn.nsdl.co.in/on_search",
      response,
      {
        headers: {
          Authorization: process.env.Authorization,
        },
      }
    );

    console.log(
      "-----------------------------responseData.data.message-----------------------------"
    );

    console.log(responseData.data);
    console.log(responseData.data.message);

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
        type: null,
        code: null,
        path: null,
        message: null,
      },
    });
  } catch (error) {
    console.log(
      "*************************************ERROR*************************************"
    );
    console.log(error.message);
    res.status(404).json({
      message: "error",
      error: error,
    });
  }
};

exports.search = search;
