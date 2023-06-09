const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const ststuswithinit = require("../controllers/ststuswithinit&confirm");

// Endpoint for /on_init
router.post("/on_init", ststuswithinit.on_init);

module.exports = router;
