const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Pan: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://play-lh.googleusercontent.com/fgt7dyhffQu9eHEYf1rfrL_xYupnY4bWa1A3PUt_7xXAi5Gi6LxW3SLMaPQwEH37JV4",
  },
  WhatsAppNumber: {
    type: Number,
    required: true,
  },
  CompanyName: {
    type: String,
    required: true,
  },
  CompanyType: {
    type: String,
    required: true,
  },
  License: {
    type: String,
    required: true,
  },
  Store: [
    {
      StoreID: {
        type: mongoose.Types.ObjectId,
        ref: "Store",
      },
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userList = new mongoose.model("users", userSchema);

module.exports = userList;
