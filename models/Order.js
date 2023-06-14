const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  Items: [
    {
      ItemID: {
        type: mongoose.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  SellerID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  CustormerID: {
    // type: mongoose.Types.ObjectId,
    type: String,
    required: true,
    // ref: "",
  },
  StoreID: {
    type: mongoose.Types.ObjectId,
    ref: "Store",
  },
  Date: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  ShippingAddress: {
    type: String,
    required: true,
  },
});

const OrderList = new mongoose.model("Order", OrderSchema);

module.exports = OrderList;
