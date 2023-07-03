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

router.post(
  "/getStoreData",
  [check("StoreID", "StoreID is Required").not().isEmpty()],
  ProfileController.getStoreData
);

// Get Store Items
router.post(
  "/UpdateProfile",
  [check("SellerID", "SellerID is Required").not().isEmpty()],
  [check("StoreID", "StoreID is Required").not().isEmpty()],
  ProfileController.UpdateProfile
);

// router.use(auth);

module.exports = router;
