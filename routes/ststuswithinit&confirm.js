const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const ststuswithinit = require("../controllers/ststuswithinit&confirm");

// Endpoint for /on_init
router.post(
  "/on_init",
  [check("context", "context is Required").not().isEmpty()],
  [check("message", "message is Required").not().isEmpty()],
  ststuswithinit.on_init
);

// Endpoint for /confirm
router.post("/confirm", ststuswithinit.confirm);

// Function to query the order status using the transaction ID
router.post("/status", ststuswithinit.status);

module.exports = router;
