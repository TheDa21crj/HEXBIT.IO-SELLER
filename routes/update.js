const express = require("express");
const { check } = require("express-validator");


const router = express.Router();

const updateController = require("../controllers/update");

router.post('/update',updateController.update);

module.exports = router;
