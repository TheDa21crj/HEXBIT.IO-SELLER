const express = require("express");
const LoginController = require("../controllers/LoginController");
const { check } = require("express-validator");

const router = express.Router();

// Register Seller
router.post(
  "/register",
  [check("name", "name is Required").not().isEmpty()],
  [check("email", "email is Required").not().isEmpty()],
  [check("Pan", "Pan is Required").not().isEmpty()],
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("CompanyName", "CompanyName is Required").not().isEmpty()],
  [check("CompanyType", "CompanyType is Required").not().isEmpty()],
  [check("License", "License is Required").not().isEmpty()],
  [check("password", "password is Required").not().isEmpty()],
  LoginController.registerUser
);

// Login Seller
router.post(
  "/login",
  [check("email", "email is Required").not().isEmpty()],
  [check("password", "password is Required").not().isEmpty()],
  LoginController.login
);

// Add Store

module.exports = router;
