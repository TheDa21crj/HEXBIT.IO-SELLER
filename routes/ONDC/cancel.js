const express = require("express");
const { check } = require("express-validator");
const cancel = require("./../../controllers/ONDC/cancel");

const router = express.Router();

// Register Seller
router.post("/", cancel.cancel);

module.exports = router;