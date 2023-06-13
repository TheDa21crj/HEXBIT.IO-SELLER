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

const InventoryGet = async (req, res, next) => {
  try {
    const itemData = await Items.find({});
    res
      .status(202)
      .json({ status: true, NumberOFItems: itemData.length, itemData });
  } catch (error) {}
};

exports.InventoryGet = InventoryGet;
