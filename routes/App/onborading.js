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

// Register OTP
router.post(
  "/OptVer",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("Otp", "Otp is Required").not().isEmpty()],
  onboardingController.OptVer
);

// Register Name
router.post(
  "/name&Email",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("feild", "feild is Required").not().isEmpty()],
  [check("value", "value is Required").not().isEmpty()],
  onboardingController.nameEmail
);

// Register Company
router.post(
  "/Company",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("name", "name is Required").not().isEmpty()],
  [check("type", "type is Required").not().isEmpty()],
  [check("nature", "nature is Required").not().isEmpty()],
  onboardingController.Company
);

// Register License
router.post(
  "/CompanyLicense",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("GSTIN", "GSTIN is Required").not().isEmpty()],
  [check("License", "License is Required").not().isEmpty()],
  onboardingController.CompanyLicense
);

// Register License
router.post(
  "/Login",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("email", "email is Required").not().isEmpty()],
  onboardingController.Login
);

// router.use(auth);

module.exports = router;
