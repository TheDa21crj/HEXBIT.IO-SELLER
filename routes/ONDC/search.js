const express = require("express");
const { check } = require("express-validator");
const search = require("./../../controllers/ONDC/search");

const router = express.Router();

// Register Seller
router.post("/register", search.search);

module.exports = router;
