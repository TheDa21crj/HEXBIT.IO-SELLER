const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  Items: [
    {
      ItemID: {
        type: mongoose.Types.ObjectId,
        ref: "Item",
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
  ammount: {
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
