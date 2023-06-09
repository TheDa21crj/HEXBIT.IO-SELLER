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

// Search by city
const searchCity = async (req, res) => {
  const { city, fulfillment, payment } = req.body.context;

  const cityCode = city;
  const gps = fulfillment.end.location.gps;
  const areaCode = fulfillment.end.location.address.area_code;
  const finderFeeType = payment["@ondc/org/buyer_app_finder_fee_type"];
  const finderFeeAmount = payment["@ondc/org/buyer_app_finder_fee_amount"];

  // Perform search logic based on city code, GPS, and area code
  const searchResults = performSearchByCity(cityCode, gps, areaCode);

  // Calculate finder fee based on the finder fee type and amount
  const finderFee = calculateFinderFee(finderFeeType, finderFeeAmount);

  // Return search results and finder fee
  res.json({ searchResults, finderFee });
};

// Search by category
const searchCategory = async (req, res) => {
  const { category, fulfillment, payment } = req.body.message.intent;

  const categoryCode = category.id;
  const gps = fulfillment.end.location.gps;
  const areaCode = fulfillment.end.location.address.area_code;
  const finderFeeType = payment["@ondc/org/buyer_app_finder_fee_type"];
  const finderFeeAmount = payment["@ondc/org/buyer_app_finder_fee_amount"];

  // Perform search logic based on category code, GPS, and area code
  const searchResults = performSearchByCategory(categoryCode, gps, areaCode);

  // Calculate finder fee based on the finder fee type and amount
  const finderFee = calculateFinderFee(finderFeeType, finderFeeAmount);

  // Return search results and finder fee
  res.json({ searchResults, finderFee });
};

// Search by fulfillment end location
const searchFulfillment = async (req, res) => {
  const { fulfillment, payment } = req.body.message.intent;

  const gps = fulfillment.end.location.gps;
  const areaCode = fulfillment.end.location.address.area_code;
  const finderFeeType = payment["@ondc/org/buyer_app_finder_fee_type"];
  const finderFeeAmount = payment["@ondc/org/buyer_app_finder_fee_amount"];

  // Perform search logic based on GPS and area code
  const searchResults = performSearchByFulfillment(gps, areaCode);

  // Calculate finder fee based on the finder fee type and amount
  const finderFee = calculateFinderFee(finderFeeType, finderFeeAmount);

  // Return search results and finder fee
  res.json({ searchResults, finderFee });
};

// Helper functions

exports.searchFulfillment = searchFulfillment;
exports.searchCategory = searchCategory;
exports.searchCity = searchCity;
exports.searchItem = searchItem;
