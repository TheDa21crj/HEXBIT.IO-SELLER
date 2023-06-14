const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalSold: {
    type: Number,
    default: 0,
  },
  Img: {
    type: String,
    required: true,
  },
  SellerID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

const ItemList = new mongoose.model("Item", ItemSchema);

module.exports = ItemList;
