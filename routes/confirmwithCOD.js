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
router.post(
  "/select",
  [check("context", "context is Required").not().isEmpty()],
  [check("message", "message is Required").not().isEmpty()],
  confirmwithCOD.select
);

// Endpoint for /confirm
router.post("/confirm", confirmwithCOD.confirm);

// Endpoint for /on_confirm
router.post("/on_confirm", confirmwithCOD.on_confirm);

// Endpoint for /on_status and /on_update
router.post(["/on_status", "/on_update"], confirmwithCOD.on_status);

module.exports = router;
