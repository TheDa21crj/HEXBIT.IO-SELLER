const axios = require("axios");
const { validationResult } = require("express-validator");

// Endpoint for handling support requests
const support = async (req, res) => {
  // Extract the reference ID from the request body
  const { ref_id } = req.body.message;

  // Perform necessary validations and checks on the reference ID
  // ...

  // Call the support function with the reference ID
  const supportResponse = handleSupportRequest(ref_id);

  // Return the support response
  res.json({ success: true, message: supportResponse });
};

exports.support = support;
