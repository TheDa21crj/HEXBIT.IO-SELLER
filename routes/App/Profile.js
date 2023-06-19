const express = require("express");
const auth = require("./../../middleWare/auth");
const { check } = require("express-validator");

// Controller
const ProfileController = require("./../../controllers/App/ProfileController");

const router = express.Router();

// Get Store Items
router.post(
  "/getStoreList",
  [check("SellerID", "SellerID is Required").not().isEmpty()],
  ProfileController.getStoreList
);

// router.use(auth);

module.exports = router;
