const xlsx = require("xlsx");
const path = require("path");
const axios = require("axios");
const { validationResult } = require("express-validator");

// Define the route for the /search API
const search = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const filePath = path.join(
    __dirname,
    "..",
    "Data",
    "ONDC-city-state-codes.xlsx"
  );

  const workbook = xlsx.readFile(filePath);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const cityCodes = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  // Extract the necessary data from the request payload
  const { context, message } = req.body;
  const { city } = context;

  // Perform the search operation based on the city
  const sellersInCity = searchSellersByCity(city, cityCodes);

  // Process buyer app finder fee calculations
  const finderFeeType =
    message.intent.payment["@ondc/org/buyer_app_finder_fee_type"];
  const finderFeeAmount =
    message.intent.payment["@ondc/org/buyer_app_finder_fee_amount"];
  const finderFee = calculateFinderFee(finderFeeType, finderFeeAmount);

  // Prepare the response payload
  const response = {
    context: {
      domain: context.domain,
      country: context.country,
      city: context.city,
      action: context.action,
      core_version: context.core_version,
      bap_id: context.bap_id,
      bap_uri: context.bap_uri,
      transaction_id: context.transaction_id,
      message_id: context.message_id,
      timestamp: context.timestamp,
      ttl: context.ttl,
    },
    message: {
      sellers: sellersInCity,
      finder_fee: finderFee,
    },
  };

  const responseData = await axios.post(process.env.SEARCH, response, {
    headers: {
      Authorization: "iUTpWtF68yckymVVY/aaXPHrMMPRz/dvYhXf3leVRI8=",
    },
  });

  // Send the response
  console.log(responseData);

  res.status(202).json(responseData.data);
};

// Helper function to search for sellers in the given city
function searchSellersByCity(city, cityCodes) {
  // Perform the search logic based on the city
  const sellersInCity = []; // Placeholder, implement your actual search logic here

  return sellersInCity;
}

// Helper function to calculate the buyer app finder fee
function calculateFinderFee(type, amount) {
  // Perform the finder fee calculation logic based on the type and amount
  const finderFee = {}; // Placeholder, implement your actual calculation logic here

  return finderFee;
}

exports.search = search;
