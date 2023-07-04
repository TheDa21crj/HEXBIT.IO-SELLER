const express = require("express");
const { check } = require("express-validator");
const confirm = require("./../../controllers/ONDC/confirm");

const router = express.Router();

// Register Seller
router.post("/", confirm.confirm);

module.exports = router;