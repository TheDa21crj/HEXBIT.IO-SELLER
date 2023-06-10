const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const PostOrder = require("../controllers/PostOrder");

// Endpoint for /confirm
router.post("/cancel", PostOrder.confirm);

// Function to query the order status using the transaction ID
router.post("/update", PostOrder.status);

module.exports = router;
