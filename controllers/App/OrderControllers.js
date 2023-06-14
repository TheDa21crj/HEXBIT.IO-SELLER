const express = require("express");
const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const HttpError = require("./../../models/HttpError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const xlsx = require("xlsx");
const path = require("path");

// models
const Seller = require("./../../models/Seller");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");

const AddOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    Items,
    SellerID,
    Date,
    Status,
    method,
    CustormerID,
    amount,
    ShippingAddress,
  } = req.body;

  let users;
  try {
    users = await Seller.findOne({ WhatsAppNumber });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }

  if (users) {
    res.json({ exists: true });
    return;
  } else {
    let image;
    try {
      image = gravatar.url(WhatsAppNumber, { s: "200", r: "pg", d: "mm" });
    } catch (e) {
      const error = new HttpError("gravatar error", 400);
      return next(error);
    }

    const newUser = new Seller({
      WhatsAppNumber,
      image,
      Store: [],
    });

    try {
      const createduser = await newUser.save();

      var userinfo = {
        pic: createduser.image,
        WhatsAppNumber,
      };

      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);

      res.json({ exists: false, user: userinfo });
    } catch (err) {
      console.log(err);
      const error = new HttpError("Cannot add user", 400);
      return next(error);
    }
  }
};

exports.AddOrder = AddOrder;
