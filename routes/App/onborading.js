const express = require("express");
const auth = require("./../../middleWare/auth");
const { check } = require("express-validator");

// Controller
const onboardingController = require("./../../controllers/App/onboardingController");

const router = express.Router();

// Register Seller
router.post(
  "/WhatsAppNumber",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  onboardingController.WhatsAppNumber
);

// Register Seller
router.get(
  "/OptVer",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("Otp", "Otp is Required").not().isEmpty()],
  onboardingController.OptVer
);

// router.use(auth);

module.exports = router;
