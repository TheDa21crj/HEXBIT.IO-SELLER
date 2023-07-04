const express = require("express");
const { check } = require("express-validator");
const init = require("./../../controllers/ONDC/init");

const router = express.Router();

// Register Seller
router.post("/", init.init);

module.exports = router;