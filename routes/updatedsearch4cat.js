const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const updatedsearch4cat = require("../controllers/updatedsearch4cat");

// Search by item
router.post("/search/item", updatedsearch4cat.searchItem);

// Search by city
router.post("/search/city", updatedsearch4cat.searchCity);

module.exports = router;
