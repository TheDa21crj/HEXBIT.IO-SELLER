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

const AddOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    Items,
    SellerID,
    StoreID,
    Date,
    Status,
    method,
    CustormerID,
    amount,
    ShippingAddress,
  } = req.body;

  let users;
  try {
    users = await Seller.findOne({ _id: SellerID });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }

  let stores;
  try {
    stores = await Store.findOne({ _id: StoreID });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }

  if (users) {
    const OrderNew = new Order({
      Items,
      SellerID,
      Date,
      Status,
      method,
      CustormerID,
      amount,
      ShippingAddress,
    });

    let createduser = await OrderNew.save();
  } else {
    const error = new HttpError("Seller Does Not --", 400);
    return next(error);
  }
};

exports.AddOrder = AddOrder;
