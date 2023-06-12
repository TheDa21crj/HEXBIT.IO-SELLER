const express = require("express");
const auth = require("./../../middleWare/auth");
const { check } = require("express-validator");

// Controller
const onboardingController = require("./../../controllers/App/cartcontroller");

const router = express.Router();

// Register Seller
router.post(
  "/AddStore",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("StoreName", "StoreName is Required").not().isEmpty()],
  [check("StoreType", "StoreType is Required").not().isEmpty()],
  [check("Location", "Location is Required").not().isEmpty()],
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  onboardingController.WhatsAppNumber
);

// router.use(auth);

module.exports = router;
