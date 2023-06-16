const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const otpSchema = new mongoose.Schema({
  
  WhatsAppNumber: {
    type: Number,
    required: true,
  },
  OTP: {
    type: Number,
    default: 0,
  },
});


const userList = new mongoose.model("otpSchema", otpSchema);

module.exports = userList;
