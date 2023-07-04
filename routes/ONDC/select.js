const express = require("express");
const { check } = require("express-validator");
const select = require("./../../controllers/ONDC/select");

const router = express.Router();

// Register Seller
router.post("/", select.select);

module.exports = router;