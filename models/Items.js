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
  rating: {
    type: Number,
    required: true,
  },
  StoreID: {
    type: mongoose.Types.ObjectId,
    ref: "Store",
  },
  SellerID: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

const ItemList = new mongoose.model("Item", ItemSchema);

module.exports = ItemList;
