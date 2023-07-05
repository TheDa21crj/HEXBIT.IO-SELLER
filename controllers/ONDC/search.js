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
    "@ondc/org/available_on_cod": false,
    "@ondc/org/cancellable": true,
    "@ondc/org/contact_details_consumer_care":
      "Ramesh1, Koramangala, Bengaluru, ramesh@abc.com, 9876543210",
    "@ondc/org/mandatory_reqs_veggies_fruits": { net_quantity: "100g" },
    "@ondc/org/return_window": "P7D",
    "@ondc/org/returnable": true,
    "@ondc/org/seller_pickup_return": false,
    "@ondc/org/statutory_reqs_packaged_commodities": {
      common_or_generic_name_of_commodity: "rishav shoe 1",
      manufacturer_or_packer_address: "123, xyz street, Bengaluru",
      manufacturer_or_packer_name: "rishav",
      month_year_of_manufacture_packing_import: "08/2022",
      net_quantity_or_measure_of_commodity_in_pkg: "100",
    },
    "@ondc/org/statutory_reqs_prepackaged_food": {
      additives_info: "Preservatives, Artificial Colours",
      brand_owner_FSSAI_license_no: "1234567890",
      importer_FSSAI_license_no: "1234567890",
      nutritional_info:
        "Energy(KCal)-(per 100kg) 420, (per serving 50g)250; Protein(g)-(per 100kg) 12, (per serving 50g) 6",
      other_FSSAI_license_no: "1234567890",
    },
    "@ondc/org/time_to_ship": "PT45M",
    bpp_details: {
      name: "Is Going Online",
      bap_id: context.bap_id,
      images: [
        "https://www.ndhgo.com/wp-content/uploads/2021/05/NDHGO-Logo-2021-01.png",
      ],
      long_desc:
        "Is Going Online lets you sell products directly to your customers globally or locally, including online marketplaces like Amazon, Flipkart, and eBay. Our expert support team will help you to setup the online store and increase revenue by selling to more customers. At Is Going Online, accessible from isgoing.online, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Is Going Online and how we use it. rishav",
      short_desc:
        "Is Going Online lets you sell products directly to your customers globally or locally, including online marketplaces like Amazon, Flipkart, and eBay. rishav",
      symbol:
        "https://www.ndhgo.com/wp-content/uploads/2021/05/NDHGO-Logo-2021-01.png",
    },
    category_details: {},
    category_id: "RET-12-14",
    descriptor: {
      images: [
        "https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/g/q/l/12-ga1142-12-adidas-cblack-sonink-ftwwht-original-imageh7fdcyg8cvu-bb.jpeg?q=70",
      ],
      long_desc: "addidas shoe1  long desc",
      name: "Addidas Shoe 1",
      short_desc: "addidas shoe 1 short desc",
      symbol:
        "https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/g/q/l/12-ga1142-12-adidas-cblack-sonink-ftwwht-original-imageh7fdcyg8cvu-bb.jpeg?q=70",
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
    console.log("Search Word -> ", message.intent.item.descriptor.name);

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
    console.log(error.config);
    res.status(404).json({
      message: "error",
    });
  }
};

exports.search = search;
