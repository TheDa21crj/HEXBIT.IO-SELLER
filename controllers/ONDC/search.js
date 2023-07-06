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
        "bpp/fulfillments": [
          {
            id: "1",
            type: "Delivery",
          },
          {
            id: "2",
            type: "Self-Pickup",
          },
          {
            id: "3",
            type: "Delivery and Self-Pickup",
          },
        ],
        "bpp/descriptor": {
          name: "ABC store",
          symbol: "https://abc.com/images/1-shop-img",
          short_desc: "Online eCommerce Store",
          long_desc: "Online eCommerce Store",
          images: ["https://abc.com/images/shop-img"],
        },
        "bpp/providers": [
          {
            id: "P1",
            time: {
              label: "disable",
              timestamp: "2023-02-03T08:00:30.000Z",
            },
            descriptor: {
              name: "ABC store",
              symbol: "https://abc.com/images/shop-img",
              short_desc: "ABC store",
              long_desc: "ABC store_",
              Iimages: ["https://abc.com/images/18275/18275-1-shop-img"],
            },
            "@ondc/org/fssai_license_no": "12345678901234",
            ttl: ";P1D",
            locations: [
              {
                id: "L1",
                gps: "12.967555,77.749666",
                address: {
                  locality: "Jayanagar 4th Block",
                  street: "Jayanagar 4th Block",
                  city: "Bengaluru",
                  area_code: "560076",
                  state: "KA",
                },
                circle: {
                  gps: "12.967555,77.749666",
                  radius: {
                    unit: "km",
                    value: "3",
                  },
                },
                time: {
                  days: "1,2,3,4,5,6,7",
                  schedule: {
                    holidays: ["2022-08-15", "2022-08-19"],
                    frequency: "PT4HPT4H",
                    times: ["1100", "1900"],
                  },
                  range: {
                    start: "1100",
                    end: "2100",
                  },
                },
              },
            ],
            items: [
              {
                id: "I1",
                descriptor: {
                  name: "Atta",
                  code: "1:XXXXXXXXXXXXX",
                  symbol: "https://abc.com/images/07.png",
                  short_desc: "Ashirwad Atta 5kg",
                  long_desc: "Ashirwad Atta 5kg",
                  images: ["https://abc.com/images/07.png"],
                },
                quantity: {
                  available: {
                    count: "1",
                  },
                  maximum: {
                    count: "2",
                  },
                },
                price: {
                  currency: "INR",
                  value: "170.0",
                  maximum_value: "180.0",
                },
                category_id: "Packaged Commodities",
                fulfillment_id: "1",
                location_id: "L1",
                recommended: true,
                "@ondc/org/returnable": true,
                "@ondc/org/cancellable": true,
                "@ondc/org/return_window": "P7D",
                "@ondc/org/seller_pickup_return": false,
                "@ondc/org/time_to_ship": "PT45M",
                "@ondc/org/available_on_cod": false,
                "@ondc/org/contact_details_consumer_care":
                  "Ramesh,ramesh@abc.com,18004254444",
                "@ondc/org/statutory_reqs_packaged_commodities": {
                  manufacturer_or_packer_name: "ITC",
                  manufacturer_or_packer_address:
                    "ITC Quality Care Cell,P.O Box No.592,Bangalore-560005",
                  common_or_generic_name_of_commodity: "Ashirwad Atta",
                  net_quantity_or_measure_of_commodity_in_pkg: "5kg",
                  month_year_of_manufacture_packing_import: "501/2023",
                  imported_product_country_of_origin: "IND",
                },
                "@ondc/org/statutory_reqs_prepackaged_food": {
                  nutritional_info:
                    "Energy(KCal)-(per 100kg) 420,(per serving 50g)250;Protein(g)-(per 100kg) 12,(per serving 50g) 6",
                  additives_info: "Preservatives,Artificial Colours",
                  brand_owner_FSSAI_license_no: "12345678901234",
                  other_FSSAI_license_no: "12345678901234",
                  importer_FSSAI_license_no: "12345678901234",
                  imported_product_country_of_origin: "IND",
                },
                "@ondc/org/mandatory_reqs_veggies_fruits": {
                  net_quantity: "100g",
                },
                tags: {
                  veg: "yes",
                  non_veg: "no",
                },
              },
            ],
            fulfillments: [
              {
                contact: {
                  phone: "9886098860",
                  email: "abc@xyz.com",
                },
              },
            ],
            tags: [
              {
                code: "serviceability",
                list: [
                  {
                    code: "location",
                    value: "L1",
                  },
                  {
                    code: "category",
                    value: "Eggs, Meat & Fish",
                  },
                  {
                    code: "type",
                    value: "10",
                  },
                  {
                    code: "val",
                    value: "3",
                  },
                  {
                    code: "unit",
                    value: "km",
                  },
                ],
              },
              {
                code: "serviceability",
                list: [
                  {
                    code: "location",
                    value: "L1",
                  },
                  {
                    code: "category",
                    value: "Kitchen Accessories",
                  },
                  {
                    code: "type",
                    value: "12",
                  },
                  {
                    code: "val",
                    value: "IND",
                  },
                  {
                    code: "unit",
                    value: "country",
                  },
                ],
              },
            ],
          },
        ],
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
