const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const updatedsearch4cat = require("../controllers/updatedsearch4cat");

router.post("/search/item", updatedsearch4cat.searchItem);

module.exports = router;
