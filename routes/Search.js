const express = require("express");

const router = express.Router();

// controllers
const searchController = require("../controllers/searchController");

// search
// const search = async (req, res, next) => {};
router.post("/", searchController.search);

module.exports = router;
