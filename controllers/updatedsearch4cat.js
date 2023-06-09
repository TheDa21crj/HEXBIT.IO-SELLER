const axios = require("axios");
const { validationResult } = require("express-validator");

// Search by item
const searchItem = async (req, res) => {
  const { descriptor, fulfillment, payment } = req.body.message.intent;

  const itemName = descriptor.name;
  const gps = fulfillment.end.location.gps;
  const areaCode = fulfillment.end.location.address.area_code;
  const finderFeeType = payment["@ondc/org/buyer_app_finder_fee_type"];
  const finderFeeAmount = payment["@ondc/org/buyer_app_finder_fee_amount"];

  // Perform search logic based on item name, GPS, and area code
  const searchResults = performSearchByItem(itemName, gps, areaCode);

  // Calculate finder fee based on the finder fee type and amount
  const finderFee = calculateFinderFee(finderFeeType, finderFeeAmount);

  // Return search results and finder fee
  res.json({ searchResults, finderFee });
};

exports.searchItem = searchItem;
