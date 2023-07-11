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

  console.log("context.transaction_id -> " + context.transaction_id);
  console.log("context.message_id -> " + context.message_id);

  const response = {
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
      ttl: "PT60S",
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
          // Authorization: process.env.Authorization,
          "X-Gateway-Authorization": {
            "Signature keyId": "example-bg.com|bg3456|ed25519",
            algorithm: "ed25519",
            created: "1641287885",
            expires: "1641287885",
            headers: "(created) (expires) digest",
            signature:
              "hJ5sCmbe7s9Wateq6QAdBGloVSkLuLHWOXcRkzrMcVLthFldV4gnT9Vrnq9iDNPVSKuDqaercVjQwFlj0Ml+3Q==",
            type: "BPP",
            token: process.env.Authorization,
            valid_from: "2023-05-18T10:10:08.196Z",
            valid_to: "2026-05-18T10:10:08.196Z",
            status: "SUBSCRIBED",
            signing_public_key: "iUTpWtF68yckymVVY/aaXPHrMMPRz/dvYhXf3leVRI8=",
            encr_public_key:
              "MCowBQYDK2VuAyEAV4FZ4Px1z9ZUbKGTjvGrddnzqv8XCgjy28a9048cJ0M=",
          },
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
