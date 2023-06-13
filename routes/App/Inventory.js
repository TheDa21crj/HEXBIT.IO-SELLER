const express = require("express");
const auth = require("./../../middleWare/auth");
const { check } = require("express-validator");

// Controller
const InventoryController = require("./../../controllers/App/InventoryController");

const router = express.Router();

// Register Seller
router.get("/InventoryGet", InventoryController.InventoryGet);

module.exports = router;
