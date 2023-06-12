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

const WhatsAppNumber = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber } = req.body;

  console.log("WhatsAppNumber==", WhatsAppNumber);

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

      let token;
      try {
        token = jwt.sign(
          { userWhatsAppNumber: WhatsAppNumber },
          process.env.JWT_SECRATE,
          {
            expiresIn: "5hr",
          }
        );
      } catch (err) {
        const error = new HttpError("Error logging user", 401);
        console.log(err);
        return next(error);
      }

      var userinfo = {
        pic: createduser.image,
        WhatsAppNumber,
      };

      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);

      res.json({ exists: false, token: token, user: userinfo });
    } catch (err) {
      console.log(err);
      const error = new HttpError("Cannot add user", 400);
      return next(error);
    }
  }
};

const OptVer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber, Otp } = req.body;

  let users;

  try {
    users = await Seller.findOne({ WhatsAppNumber });

    if (users) {
      console.log(Otp, "=========", WhatsAppNumber);

      await Seller.updateOne(
        { WhatsAppNumber },
        {
          $set: {
            verifiedOTP: true,
          },
        },
        { upsert: true }
      );

      res.status(202).json({ status: true });
    } else {
      res.status(304).json({ message: "Wrong OTP" });
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Cannot add user", 400);
    return next(error);
  }
};

const nameEmail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber, feild, value } = req.body;

  let users;

  try {
    users = await Seller.findOne({ WhatsAppNumber });

    if (users) {
      console.log(feild, "=====", value);

      await Seller.updateOne(
        { WhatsAppNumber },
        {
          $set: {
            [feild]: value,
          },
        },
        { upsert: true }
      );

      res.status(202).json({ status: true });
    } else {
      res
        .status(304)
        .json({ status: false, message: "Number Does not Exists" });
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Cannot add user", 400);
    return next(error);
  }
};

exports.OptVer = OptVer;
exports.nameEmail = nameEmail;
exports.WhatsAppNumber = WhatsAppNumber;
