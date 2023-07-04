const xlsx = require("xlsx");
const path = require("path");
const axios = require("axios");
const { validationResult } = require("express-validator");

// models
const Seller = require("./../models/Seller");
const Store = require("./../models/Store");
const Items = require("./../models/Items");

// Define the route for the /search API
const cancel = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { context, message } = req.body;

  let response = { context };

  const responseData = await axios.post(process.env.ON_CANCEL, response, {
    headers: {
      Authorization: process.env.Authorization,
    },
  });

  res.status(202).json(responseData.data);
};

exports.cancel = cancel;
