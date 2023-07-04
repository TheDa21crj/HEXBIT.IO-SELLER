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
      catalog: {
        "bpp/descriptor": {
          name: "Rishav",
          symbol:
            "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/646cac0619c19a4236fb6608_328999565_448149590771366_6119874079180001204_n.jpeg",
          short_desc: "Seller Marketplace",
          long_desc: "Seller Marketplace",
          images: [
            "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/64971d22eaa2f396e6c5d9c4_41caP08gttL.jpg",
          ],
        },
        "bpp/providers": [
          {
            id: "P1",
            time: {
              label: "enable",
              timestamp: "2023-06-03T08:00:30.000Z",
            },
            fulfillments: [
              {
                id: "F1",
                type: "Delivery",
                contact: {
                  phone: "9886098860",
                  email: "abc@xyz.com",
                },
              },
            ],
            descriptor: {
              name: "Store 1",
              symbol:
                "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/646cac0619c19a4236fb6608_328999565_448149590771366_6119874079180001204_n.jpeg",
              short_desc: "Store 1",
              long_desc: "Store 1",
              images: ["https://sellerNP.com/images/store1.png"],
            },
          },
        ],
      },
    },
  };

  try {
    const responseData = await axios.post(
      // "https://virtserver.swaggerhub.com/ONDCTech/ONDC-Protocol-Core/1.0.0/on_search",
      "https://pilot-gateway-1.beckn.nsdl.co.in/on_search",
      response,
      {
        headers: {
          Authorization: process.env.Authorization,
        },
      }
    );

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
  } catch (error) {
    console.log(error.config);
    res.status(404).json({
      message: "error",
    });
  }
};

exports.search = search;
