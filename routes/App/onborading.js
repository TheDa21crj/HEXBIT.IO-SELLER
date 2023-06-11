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

router.use(auth);

// Add Store
router.post(
  "/AddStore",
  [check("StoreName", "StoreName is Required").not().isEmpty()],
  [check("StoreType", "StoreType is Required").not().isEmpty()],
  [check("Website", "Website is Required").not().isEmpty()],
  [check("StoreDescription", "StoreDescription is Required").not().isEmpty()],
  [check("name", "name is Required").not().isEmpty()],
  [check("city", "city is Required").not().isEmpty()],
  [check("state", "state is Required").not().isEmpty()],
  [check("country", "country is Required").not().isEmpty()],
  [check("area_code", "area_code is Required").not().isEmpty()],
  LoginController.AddStore
);

// Add Item
router.post(
  "/AddItem",
  [check("name", "name is Required").not().isEmpty()],
  [check("price", "price is Required").not().isEmpty()],
  [check("stock", "stock is Required").not().isEmpty()],
  [check("type", "type is Required").not().isEmpty()],
  [check("StoreID", "StoreID is Required").not().isEmpty()],
  LoginController.AddItem
);

module.exports = router;