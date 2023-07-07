const { validationResult } = require("express-validator");
const axios = require("axios");

// models
const Seller = require("./../../models/Seller");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");

// Define the route for the /search API
const search = async (req, res) => {
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
      id: "item_1",
      descriptor: {
        name: "Eiosys item 1",
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
          name: "Eiosys Store 1",
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
        city: "*",
        action: "on_search",
        core_version: "1.0.0",
        bap_id: "buyer-app.ondc.org",
        bap_uri: "https://buyer-app.ondc.org/protocol/v1",
        bpp_id: "ondc.staging.seller.eiosys.com",
        bpp_uri: "https://ondc.staging.seller.eiosys.com",
        transaction_id: "5fd333a6-3498-4f34-b160-e0bda9a4fa4e",
        message_id: "f956e973-38bc-471d-9d00-8bdb4f003837",
        timestamp: "2023-07-07T03:31:29.137Z",
      },
      bpp_details: {
        name: "Shop Eiosys",
        bpp_id: "ondc.staging.seller.eiosys.com",
      },
      quantity: {
        available: {
          count: 0,
        },
        maximum: {
          count: 0,
        },
      },
    },
  };

  console.table("<--------------------context-------------------->");
  console.table(context);
  console.table("<--------------------message-------------------->");
  console.log(message);

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
