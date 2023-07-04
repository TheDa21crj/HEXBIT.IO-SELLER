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
          name: "Seller NP",
          symbol: "https://sellerNP.com/images/np.png",
          short_desc: "Seller Marketplace",
          long_desc: "Seller Marketplace",
          images: ["https://sellerNP.com/images/np.png"],
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
              {
                id: "F2",
                type: "Self-Pickup",
                contact: {
                  phone: "9886098860",
                  email: "abc@xyz.com",
                },
              },
            ],
            descriptor: {
              name: "Store 1",
              symbol: "https://sellerNP.com/images/store1.png",
              short_desc: "Store 1",
              long_desc: "Store 1",
              images: ["https://sellerNP.com/images/store1.png"],
            },
            "@ondc/org/fssai_license_no": "12345678901234",
            ttl: "P1D",
            locations: [
              {
                id: "L1",
                time: {
                  days: "1,2,3,4,5,6,7",
                  schedule: {
                    holidays: ["2023-08-15"],
                    frequency: "PT4H",
                    times: ["1100", "1900"],
                  },
                  range: {
                    start: "1100",
                    end: "2100",
                  },
                },
                gps: "12.967555,77.749666",
                address: {
                  locality: "Jayanagar",
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
              },
            ],
            categories: [
              {
                id: "5",
                parent_category_id: "",
                descriptor: {
                  name: "Pizza",
                  short_desc: "Veg and Non-Veg pizza",
                  long_desc: "American and Italian Veg and Non-Veg Pizza",
                  images: ["https://sellerNP.com/ondc/m005.png"],
                },
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "2",
                      },
                    ],
                  },
                  {
                    code: "timing",
                    list: [
                      {
                        code: "day_from",
                        value: "1",
                      },
                      {
                        code: "day_to",
                        value: "5",
                      },
                      {
                        code: "time_from",
                        value: "1800",
                      },
                      {
                        code: "time_to",
                        value: "2200",
                      },
                    ],
                  },
                  {
                    code: "display",
                    list: [
                      {
                        code: "rank",
                        value: "3",
                      },
                    ],
                  },
                ],
              },
              {
                id: "CG1",
                descriptor: {
                  name: "Crust (any 1 option)",
                },
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "config",
                    list: [
                      {
                        code: "min",
                        value: "1",
                      },
                      {
                        code: "max",
                        value: "1",
                      },
                      {
                        code: "input",
                        value: "1",
                      },
                      {
                        code: "seq",
                        value: "1",
                      },
                    ],
                  },
                ],
              },
              {
                id: "CG2",
                descriptor: {
                  name: "Size (any 1 option)",
                },
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "config",
                    list: [
                      {
                        code: "min",
                        value: "1",
                      },
                      {
                        code: "max",
                        value: "1",
                      },
                      {
                        code: "input",
                        value: "1",
                      },
                      {
                        code: "seq",
                        value: "2",
                      },
                    ],
                  },
                ],
              },
              {
                id: "CG3",
                descriptor: {
                  name: "Size (any 1 option)",
                },
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "config",
                    list: [
                      {
                        code: "min",
                        value: "1",
                      },
                      {
                        code: "max",
                        value: "1",
                      },
                      {
                        code: "input",
                        value: "1",
                      },
                      {
                        code: "seq",
                        value: "2",
                      },
                    ],
                  },
                ],
              },
              {
                id: "CG4",
                descriptor: {
                  name: "Toppings (up to 2 options)",
                },
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "config",
                    list: [
                      {
                        code: "min",
                        value: "0",
                      },
                      {
                        code: "max",
                        value: "2",
                      },
                      {
                        code: "input",
                        value: "1",
                      },
                      {
                        code: "seq",
                        value: "3",
                      },
                    ],
                  },
                ],
              },
              {
                id: "CG5",
                descriptor: {
                  name: "Toppings (up to 2 options)",
                },
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "config",
                    list: [
                      {
                        code: "min",
                        value: "0",
                      },
                      {
                        code: "max",
                        value: "2",
                      },
                      {
                        code: "input",
                        value: "1",
                      },
                      {
                        code: "seq",
                        value: "3",
                      },
                    ],
                  },
                ],
              },
              {
                id: "CG6",
                descriptor: {
                  name: "Toppings (up to 2 options)",
                },
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "config",
                    list: [
                      {
                        code: "min",
                        value: "0",
                      },
                      {
                        code: "max",
                        value: "2",
                      },
                      {
                        code: "input",
                        value: "1",
                      },
                      {
                        code: "seq",
                        value: "3",
                      },
                    ],
                  },
                ],
              },
            ],
            items: [
              {
                id: "I1",
                descriptor: {
                  name: "Farm House Pizza",
                  symbol: "https://sellerNP.com/images/i1.png",
                  short_desc: "Farm House Pizza",
                  long_desc: "Farm House Pizza",
                  images: ["https://sellerNP.com/images/i1.png"],
                },
                quantity: {
                  unitized: {
                    measure: {
                      unit: "unit",
                      value: "1",
                    },
                  },
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "269.0",
                  maximum_value: "269.0",
                },
                category_id: "Pizza",
                category_ids: ["5:1"],
                fulfillment_id: "F1",
                location_id: "L1",
                related: false,
                recommended: true,
                "@ondc/org/returnable": false,
                "@ondc/org/cancellable": false,
                "@ondc/org/return_window": "PT1H",
                "@ondc/org/seller_pickup_return": false,
                "@ondc/org/time_to_ship": "PT45M",
                "@ondc/org/available_on_cod": false,
                "@ondc/org/contact_details_consumer_care":
                  "Ramesh,ramesh@abc.com,18004254444",
                tags: [
                  {
                    code: "custom_group",
                    list: [
                      {
                        code: "id",
                        value: "CG1",
                      },
                      {
                        code: "id",
                        value: "CG2",
                      },
                      {
                        code: "id",
                        value: "CG3",
                      },
                    ],
                  },
                  {
                    code: "timing",
                    list: [
                      {
                        code: "day_from",
                        value: "1",
                      },
                      {
                        code: "day_to",
                        value: "5",
                      },
                      {
                        code: "time_from",
                        value: "1800",
                      },
                      {
                        code: "time_to",
                        value: "2200",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C1",
                descriptor: {
                  name: "New Hand Tossed",
                },
                quantity: {
                  unitized: {
                    measure: {
                      unit: "unit",
                      value: "1",
                    },
                  },
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "0.0",
                  maximum_value: "0.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG1",
                      },
                      {
                        code: "default",
                        value: "yes",
                      },
                    ],
                  },
                  {
                    code: "child",
                    list: [
                      {
                        code: "id",
                        value: "CG2",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C2",
                descriptor: {
                  name: "100% Wheat Thin Crust",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "0.0",
                  maximum_value: "0.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG1",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "child",
                    list: [
                      {
                        code: "id",
                        value: "CG3",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C3",
                descriptor: {
                  name: "Regular",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "0.0",
                  maximum_value: "0.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG2",
                      },
                      {
                        code: "default",
                        value: "yes",
                      },
                    ],
                  },
                  {
                    code: "child",
                    list: [
                      {
                        code: "id",
                        value: "CG4",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C4",
                descriptor: {
                  name: "Large",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "450.0",
                  maximum_value: "450.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG2",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "child",
                    list: [
                      {
                        code: "id",
                        value: "CG5",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C5",
                descriptor: {
                  name: "Medium",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "210.0",
                  maximum_value: "210.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG2",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "child",
                    list: [
                      {
                        code: "id",
                        value: "CG6",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C6",
                descriptor: {
                  name: "Regular",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "45.0",
                  maximum_value: "45.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG3",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "child",
                    list: [
                      {
                        code: "id",
                        value: "CG4",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C7",
                descriptor: {
                  name: "Medium",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "275.0",
                  maximum_value: "275.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG3",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "child",
                    list: [
                      {
                        code: "id",
                        value: "CG6",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C8",
                descriptor: {
                  name: "Grilled Mushrooms",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "35.0",
                  maximum_value: "35.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG4",
                      },
                      {
                        code: "default",
                        value: "yes",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C9",
                descriptor: {
                  name: "Fresh Tomato",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "35.0",
                  maximum_value: "35.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG4",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C10",
                descriptor: {
                  name: "Pepper Barbeque Chicken",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "50.0",
                  maximum_value: "50.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG4",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "non_veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C11",
                descriptor: {
                  name: "Grilled Mushrooms",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "80.0",
                  maximum_value: "80.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG5",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C12",
                descriptor: {
                  name: "Fresh Tomato",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "80.0",
                  maximum_value: "80.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG5",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C13",
                descriptor: {
                  name: "Pepper Barbeque Chicken",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "95.0",
                  maximum_value: "95.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG5",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "non_veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C14",
                descriptor: {
                  name: "Grilled Mushrooms",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "80.0",
                  maximum_value: "80.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG6",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C15",
                descriptor: {
                  name: "Fresh Tomato",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "80.0",
                  maximum_value: "80.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG6",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
              {
                id: "C16",
                descriptor: {
                  name: "Pepper Barbeque Chicken",
                },
                quantity: {
                  available: {
                    count: "99",
                  },
                  maximum: {
                    count: "99",
                  },
                },
                price: {
                  currency: "INR",
                  value: "95.0",
                  maximum_value: "95.0",
                },
                category_id: "F&B",
                related: true,
                tags: [
                  {
                    code: "type",
                    list: [
                      {
                        code: "type",
                        value: "1",
                      },
                    ],
                  },
                  {
                    code: "parent",
                    list: [
                      {
                        code: "id",
                        value: "CG6",
                      },
                      {
                        code: "default",
                        value: "no",
                      },
                    ],
                  },
                  {
                    code: "veg_nonveg",
                    list: [
                      {
                        code: "non_veg",
                        value: "yes",
                      },
                    ],
                  },
                ],
              },
            ],
            tags: [
              {
                code: "order_value",
                list: [
                  {
                    code: "min_value",
                    value: "300.00",
                  },
                ],
              },
              {
                code: "timing",
                list: [
                  {
                    code: "type",
                    value: "1",
                  },
                  {
                    code: "location",
                    value: "L1",
                  },
                  {
                    code: "day_from",
                    value: "1",
                  },
                  {
                    code: "day_to",
                    value: "7",
                  },
                  {
                    code: "time_from",
                    value: "1000",
                  },
                  {
                    code: "time_to",
                    value: "2200",
                  },
                ],
              },
              {
                code: "timing",
                list: [
                  {
                    code: "type",
                    value: "3",
                  },
                  {
                    code: "location",
                    value: "L1",
                  },
                  {
                    code: "day_from",
                    value: "1",
                  },
                  {
                    code: "day_to",
                    value: "7",
                  },
                  {
                    code: "time_from",
                    value: "1000",
                  },
                  {
                    code: "time_to",
                    value: "2000",
                  },
                ],
              },
              {
                code: "timing",
                list: [
                  {
                    code: "type",
                    value: "2",
                  },
                  {
                    code: "location",
                    value: "L1",
                  },
                  {
                    code: "day_from",
                    value: "1",
                  },
                  {
                    code: "day_to",
                    value: "7",
                  },
                  {
                    code: "time_from",
                    value: "1000",
                  },
                  {
                    code: "time_to",
                    value: "2200",
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
                    value: "F&B",
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
            ],
          },
        ],
      },
    },
  };

  try {
    const responseData = await axios.post(
      // "https://virtserver.swaggerhub.com/ONDCTech/ONDC-Protocol-Core/1.0.0/on_search",
      "https://buyer-app.ondc.org/protocol/v1/on_search",
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
