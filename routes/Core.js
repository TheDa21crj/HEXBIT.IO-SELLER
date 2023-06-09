const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const searchController = require("../controllers/searchController");
const selectController = require("../controllers/selectController");
const supportController = require("../controllers/support");

// search
router.post(
  "/search",
  check("context", "context is Required").not().isEmpty(),
  check("message", "message is Required").not().isEmpty(),
  searchController.search
);

// select
router.post(
  "/select",
  check("context", "context is Required").not().isEmpty(),
  check("message", "message is Required").not().isEmpty(),
  selectController.select
);

// support
router.post("/support", supportController.support);

module.exports = router;
