const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// controllers
const update = require("../controllers/update");

//update
router.post("/update", update.update);

module.exports = router;
