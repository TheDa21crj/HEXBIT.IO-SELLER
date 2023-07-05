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
            "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/646cac0619c19a4236fb6608_328999565_448149590771366_6119874079180001204_n.jpeg",
          ],
          long_desc:
            "Is Going Online lets you sell products directly to your customers globally or locally, including online marketplaces like Amazon, Flipkart, and eBay. Our expert support team will help you to setup the online store and increase revenue by selling to more customers. At Is Going Online, accessible from isgoing.online, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Is Going Online and how we use it. rishav",
          short_desc:
            "Is Going Online lets you sell products directly to your customers globally or locally, including online marketplaces like Amazon, Flipkart, and eBay. rishav",
          symbol:
            "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/646cac0619c19a4236fb6608_328999565_448149590771366_6119874079180001204_n.jpeg",
        },
        category_details: {},
        category_id: "RET-12-14",
        descriptor: {
          images: [
            "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/64971d22eaa2f396e6c5d9c4_41caP08gttL.jpg",
          ],
          long_desc: "rishav shoe1  long desc rishav",
          name: "rishav Shoe 1",
          short_desc: "rishav shoe 1 short desc rishav",
          symbol:
            "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/64971d22eaa2f396e6c5d9c4_41caP08gttL.jpg",
        },
        fulfillment_details: { id: "1", type: "Delivery" },
        fulfillment_id: "1",
        id: "addidas_ondc_001",
        location_details: {
          gps: "12.967555,77.749666",
          id: "addidas-store-location-id-1",
          circle: {
            gps: "12.967555,77.749666",
            radius: { unit: "km", value: "5" },
          },
          area_code: "560076",
          city: "Bengaluru",
          state: "KA",
          street: "Jayanagar 4th Block",
          time: {
            days: "1,2,3,4,5,6,7",
            range: { start: "1100", end: "2100" },
            schedule: {
              holidays: ["2022-08-15", "2022-08-19"],
              frequency: "PT4H",
              times: ["1100", "1700"],
            },
          },
        },
        location_id: "addidas-store-location-id-1",
        price: { currency: "INR", value: "275.0", maximum_value: "220" },
        provider_details: {
          id: "Rishav",
          descriptor: {
            images: [
              "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/62db1dc91e10d0634e7b8bb7_friends.webp",
            ],
            long_desc: "seller 1 long description",
            name: "Rishav",
            short_desc: "rishav 1 short description",
            symbol:
              "https://uploads-ssl.webflow.com/61dd733efbe56d4e2f5f701f/640d7823317316351292beeb_Frame%201.png",
          },
        },
        quantity: { available: { count: "1" }, maximum: { count: "2" } },
        storeOpenTillDate: "2023-07-05T21:00:00.628Z",
        tags: { veg: "yes", non_veg: "no" },
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
      "-----------------------------responseData-----------------------------"
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
      "*************************************error*************************************"
    );
    console.log(error);
    res.status(404).json({
      message: "error",
    });
  }
};

exports.search = search;
