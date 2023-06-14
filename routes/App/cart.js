const express = require("express");
const auth = require("./../../middleWare/auth");
const { check } = require("express-validator");

// Controller
const cartcontroller = require("./../../controllers/App/cartcontroller");

const router = express.Router();

// Register Seller
router.post(
  "/AddStore",
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("StoreName", "StoreName is Required").not().isEmpty()],
  [check("StoreType", "StoreType is Required").not().isEmpty()],
  [check("PinCode", "PinCode is Required").not().isEmpty()],
  [check("Add", "Add is Required").not().isEmpty()],
  [check("Locality", "Locality is Required").not().isEmpty()],
  [check("City", "City is Required").not().isEmpty()],
  [check("State", "State is Required").not().isEmpty()],
  [check("Country", "Country is Required").not().isEmpty()],
  [check("Website", "Website is Required").not().isEmpty()],
  [check("StoreDescription", "StoreDescription is Required").not().isEmpty()],
  cartcontroller.AddStore
);

// Get Store Items
router.post(
  "/getStoreItems",
  [check("StoreID", "StoreID is Required").not().isEmpty()],
  cartcontroller.getStoreItems
);

// router.use(auth);

module.exports = router;
