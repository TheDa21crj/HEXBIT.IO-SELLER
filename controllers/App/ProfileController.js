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
    user = await Seller.find({ _id: SellerID }).populate(
      "Store.StoreID",
      "StoreName StoreType"
    );

    if (user) {
      res.status(202).json({ status: true, StoresList: user[0].Store });
    } else {
      res
        .status(204)
        .json({ status: false, message: "Number Does not Exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(304).json({ status: false, message: "Number Does not Exists" });
  }
};

const getStoreData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { StoreID } = req.body;

  console.log("StoreID = " + StoreID);

  let store;

  try {
    store = await Store.find({ _id: StoreID }, { StoreName: 1, StoreType: 1 });

    if (store) {
      res.status(202).json({ status: true, store });
    } else {
      res
        .status(204)
        .json({ status: false, message: "Number Does not Exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(304).json({ status: false, message: "Number Does not Exists" });
  }
};

const UpdateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { SellerID, StoreID, Name, Email, StoreName, Nature } = req.body;

  console.log(SellerID, StoreID, Name, Email, StoreName, Nature);

  try {
    let sellerData = await Seller.find({ _id: SellerID });
    if (sellerData) {
      res.status(202).json({ status: true, sellerData });
    } else {
      res.status(204).json({ status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(304).json({ status: false, message: "Number Does not Exists" });
  }
};

exports.UpdateProfile = UpdateProfile;
exports.getStoreData = getStoreData;
exports.getStoreList = getStoreList;
