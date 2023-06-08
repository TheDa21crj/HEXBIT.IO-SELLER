const express = require("express");

const router = express.Router();

// controllers
const searchController = require("../controllers/searchController");
const selectController = require("../controllers/selectController");

// search
router.post("/search", searchController.search);

// select
router.post("/select", selectController.select);

module.exports = router;
