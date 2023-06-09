const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const ststuswithinit = require("../controllers/ststuswithinit&confirm");

// Endpoint for /on_init
router.post("/on_init", ststuswithinit.on_init);

// Endpoint for /confirm
router.post("/confirm", ststuswithinit.confirm);
router.post("/status", ststuswithinit.status);

module.exports = router;
