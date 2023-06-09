const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const confirmwithCOD = require("../controllers/confirmwithCOD");

// Endpoint for /search
router.post("/search", confirmwithCOD.search);

// Endpoint for /on_search
router.post("/on_search", confirmwithCOD.on_search);

// Endpoint for /select
router.post("/select", confirmwithCOD.select);

router.post("/confirm", confirmwithCOD.confirm);
router.post("/on_confirm", confirmwithCOD.on_confirm);
router.post(["/on_status", "/on_update"], confirmwithCOD.on_status);

module.exports = router;
