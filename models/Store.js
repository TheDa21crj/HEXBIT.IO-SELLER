const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  StoreName: {
    type: String,
    required: true,
  },
  StoreType: {
    type: String,
    required: true,
  },
  Website: {
    type: String,
    required: true,
  },
  StoreDescription: {
    type: String,
    required: true,
  },
  Items: [
    {
      ItemID: {
        type: mongoose.Types.ObjectId,
        ref: "Item",
      },
    },
  ],
  Address: {
    door: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    locality: {
      type: String,
      default: "",
    },
    ward: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    area_code: {
      type: String,
      required: true,
    },
  },
});

const StoreList = new mongoose.model("Store", StoreSchema);

module.exports = StoreList;
