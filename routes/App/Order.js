const express = require("express");
const auth = require("./../../middleWare/auth");
const { check } = require("express-validator");

// Controller
const OrderControllers = require("./../../controllers/App/OrderControllers");

const router = express.Router();

// Register Seller
router.post(
  "/AddOrder",
  [check("ItemID", "ItemID is Required").not().isEmpty()],
  [check("Quantity", "Quantity is Required").not().isEmpty()],
  [check("SellerID", "SellerID is Required").not().isEmpty()],
  [check("Date", "Date is Required").not().isEmpty()],
  [check("Status", "Status is Required").not().isEmpty()],
  [check("method", "method is Required").not().isEmpty()],
  [check("StoreID", "StoreID is Required").not().isEmpty()],
  [check("amount", "amount is Required").not().isEmpty()],
  [check("ShippingAddress", "ShippingAddress is Required").not().isEmpty()],
  [check("CustormerID", "CustormerID is Required").not().isEmpty()],
  OrderControllers.AddOrder
);

// router.use(auth);

module.exports = router;
