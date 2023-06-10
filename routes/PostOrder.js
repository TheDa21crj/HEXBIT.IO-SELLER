const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const PostOrder = require("../controllers/PostOrder");

// Endpoint for /cancel
router.post("/cancel", PostOrder.confirm);

module.exports = router;
