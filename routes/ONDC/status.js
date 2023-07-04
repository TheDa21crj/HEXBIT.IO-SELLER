const express = require("express");
const { check } = require("express-validator");
const status = require("./../../controllers/ONDC/status");

const router = express.Router();

// Register Seller
router.post("/", status.status);

module.exports = router;