const express = require("express");
const { check } = require("express-validator");
const update = require("./../../controllers/ONDC/update");

const router = express.Router();

// Register Seller
router.post("/", update.update);

module.exports = router;