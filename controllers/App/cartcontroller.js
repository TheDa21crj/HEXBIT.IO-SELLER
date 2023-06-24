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

const AddStore = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    WhatsAppNumber,
    StoreName,
    StoreType,
    Website,
    PinCode,
    Add,
    Locality,
    City,
    State,
    Country,
    StoreDescription,
  } = req.body;

  try {
    let users = await Seller.findOne({ WhatsAppNumber });

    if (users) {
      console.log("userID", users._id);

      const newStore = new Store({
        StoreName,
        StoreType,
        Website,
        StoreDescription,
        Items: [],
        Address: {
          door: Add,
          name: users.name,
          locality: Locality,
          city: City,
          state: State,
          country: Country,
          area_code: PinCode,
        },
        sellerID: users._id,
      });

      try {
        const createduser = await newStore.save();

        console.log(createduser);

        let store = {
          StoreID: createduser._id,
        };

        await Seller.findOneAndUpdate(
          { WhatsAppNumber },
          {
            $push: {
              Store: store,
            },
          }
          // { upsert: true }
        );

        res.status(202).json({ status: true, storeID: createduser._id });
      } catch (err) {
        console.log(err);
        const error = new HttpError("Cannot add user", 400);
        return next(error);
      }
    } else {
      res.status(202).json({ message: "User: Does Not " });
    }
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }
};

const getStoreItems = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { StoreID } = req.body;

    console.log(StoreID);

    const sotreData = await Store.find({ _id: StoreID }).populate(
      "Items.ItemID"
    );

    console.log(sotreData[0].Items);

    res.status(202).json({ status: true, Store: sotreData[0].Items });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }
};

const getItemInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { ItemID } = req.body;

    console.log(ItemID);

    const sotreData = await Items.find({ _id: ItemID });

    res.status(202).json({ status: true, Item: sotreData });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }
};

const EditItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { ItemID, name, price, stock, type, Img, des } = req.body;

  try {
    const sotreData = await Items.find({ _id: ItemID });

    if (sotreData) {
      res.status(202).json({ status: true, Item: sotreData });
    } else {
      res.status(204).json({ status: false });
    }
  } catch (err) {
    const error = new HttpError("User not found", 500);
    return next(error);
  }
};

exports.AddStore = AddStore;
exports.EditItem = EditItem;
exports.getItemInfo = getItemInfo;
exports.getStoreItems = getStoreItems;
