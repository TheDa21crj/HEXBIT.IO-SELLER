const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const confirmwithCOD = require("../controllers/confirmwithCOD");

// Endpoint for /on_search
router.post("/on_search", confirmwithCOD.on_search);

module.exports = router;
