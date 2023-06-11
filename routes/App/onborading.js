const express = require("express");
const auth = require("../middleWare/auth");
const { check } = require("express-validator");

// Controller
const onboardingController = require("./../../controllers/App/onboardingController");

const router = express.Router();

// Register Seller
router.post(
  "/register",
  [check("name", "name is Required").not().isEmpty()],
  LoginController.registerUser
);

// router.use(auth);

module.exports = router;
