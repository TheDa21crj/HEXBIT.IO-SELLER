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
  [check("Location", "Location is Required").not().isEmpty()],
  [check("Website", "Website is Required").not().isEmpty()],
  [check("StoreDescription", "StoreDescription is Required").not().isEmpty()],
  cartcontroller.AddStore
);

// router.use(auth);

module.exports = router;
