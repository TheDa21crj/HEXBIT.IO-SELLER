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
    ItemID,
    Quantity,
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

  let ItemsData;
  try {
    ItemsData = await Items.find({ _id: ItemID });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }

  if (users && stores && ItemsData) {
    let data = {
      ItemID,
      quantity: Quantity,
    };

    const OrderNew = new Order({
      Items: data,
      SellerID,
      Date,
      Status,
      method,
      CustormerID,
      amount,
      ShippingAddress,
      StoreID,
    });

    let createduser = await OrderNew.save();

    res.status(202).json({ status: true, order: createduser });
  } else {
    const error = new HttpError("Seller Does Not --", 400);
    return next(error);
  }
};

const GetStoreOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { StoreID } = req.body;

  try {
    let storeData = await Store.find({ _id: StoreID });

    if (storeData) {
      try {
        let orders = await Order.find({ StoreID }).populate("Items.ItemID");
        if (orders) {
          res.status(202).json({ status: true, Order: orders });
        }
      } catch (e) {
        console.log(e);
        const error = new HttpError("Wrong Email Credentials", 400);
        return next(error);
      }
    } else {
      res
        .status(304)
        .json({ status: false, message: "Store Does Not Exisits" });
    }
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }
};

const orderDetails = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.body;

  try {
    let data = await Order.find({ _id: id }).populate("Items.ItemID");

    if (data) {
      res.status(202).json({ status: true, data });
    } else {
      res
        .status(304)
        .json({ status: false, message: "Store Does Not Exisits" });
    }
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }
};

const UpdateStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  const { id, val } = req.body;

  res.status(202).json({ status: true, id, val });
};

exports.AddOrder = AddOrder;
exports.orderDetails = orderDetails;
exports.UpdateStatus = UpdateStatus;
exports.GetStoreOrder = GetStoreOrder;
