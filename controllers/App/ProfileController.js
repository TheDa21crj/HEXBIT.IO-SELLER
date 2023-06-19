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
const Order = require("./../../models/Order");

const getStoreList = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { SellerID } = req.body;

  console.log("SellerID = " + SellerID);

  let user;
  try {
    user = await Seller.find({ _id: SellerID }).populate("Store.StoreID");

    if (user) {
      res.status(202).json({ status: true, StoresList: user });
    }
  } catch (error) {
    console.log(error);
    res.status(304).json({ status: false, message: "Number Does not Exists" });
  }
};

exports.getStoreList = getStoreList;
