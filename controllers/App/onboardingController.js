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
const OtpSchema = require("./../../models/Otp");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");

const WhatsAppNumber = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
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

      var userinfo = {
        pic: createduser.image,
        WhatsAppNumber,
      };

      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);

      const newOtp = new OtpSchema({
        WhatsAppNumber,
        OTP,
      });
      const generatedOtp = await newOtp.save();
      console.log(generatedOtp);

      res.json({ exists: false, user: userinfo });
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

  console.log("first");

  const { WhatsAppNumber, Otp } = req.body;

  let users;

  try {
    users = await Seller.findOne({ WhatsAppNumber });

    if (users) {
      console.log(Otp, "=========", WhatsAppNumber);
      const verOtp = await OtpSchema.findOne({ WhatsAppNumber, OTP: Otp });
      console.log("Verified otp schema->", verOtp);
      console.log("otp is->", verOtp.OTP);
      if (verOtp) {
        // if (Otp === verOtp.OTP) {
        await Seller.updateOne(
          { WhatsAppNumber },
          {
            $set: {
              verifiedOTP: true,
            },
          },
          { upsert: true }
        );

        return res.status(202).json({ status: true });
      } else {
        console.log("Wrong otp");
        return res.status(304).json({ message: "Wrong OTP" });
      }
      // }
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

const Company = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber, name, type, nature } = req.body;

  let users;
  try {
    users = await Seller.findOne({ WhatsAppNumber });

    if (users) {
      console.log(
        WhatsAppNumber,
        "-->",
        name,
        "-------",
        type,
        "-------",
        nature
      );

      await Seller.updateOne(
        { WhatsAppNumber },
        {
          $set: {
            CompanyName: name,
            CompanyType: type,
            CompanyNature: nature,
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

const CompanyLicense = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber, GSTIN, License } = req.body;

  let users;
  try {
    users = await Seller.findOne({ WhatsAppNumber }).populate("Store.StoreID");

    if (users) {
      console.log(WhatsAppNumber, "-->", GSTIN, "-------", License);

      await Seller.updateOne(
        { WhatsAppNumber },
        {
          $set: {
            GSTIN,
            License,
          },
        },
        { upsert: true }
      );

      let token;
      try {
        token = jwt.sign(
          { WhatsAppNumber: WhatsAppNumber },
          process.env.JWT_SECRATE,
          {
            expiresIn: "5hr",
          }
        );

        res.status(202).json({ status: true, token: token, userInfo: users });
      } catch (err) {
        const error = new HttpError("Error logging user", 401);
        console.log(err);
        return next(error);
      }
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

const Login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber, email } = req.body;

  let user;
  try {
    user = await Seller.findOne({ WhatsAppNumber, email }).populate(
      "Store.StoreID"
    );

    if (user) {
      console.log(WhatsAppNumber, "----------", email);

      let token;
      try {
        token = jwt.sign(
          { WhatsAppNumber: WhatsAppNumber },
          process.env.JWT_SECRATE,
          {
            expiresIn: "5hr",
          }
        );

        res.status(202).json({ status: true, token: token, userInfo: user });
      } catch (err) {
        const error = new HttpError("Error error generating token", 401);
        console.log(err);
        return next(error);
      }
    } else {
      res.status(200).json({ status: false });
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Cannot add user", 400);
    return next(error);
  }
};

const StoreData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber } = req.body;

  console.log(WhatsAppNumber);

  let sotreData;
  try {
    sotreData = await Seller.find({ WhatsAppNumber }).populate("Store.StoreID");
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }

  console.log("sotreData == true");
  console.log(sotreData == true);

  try {
    if (sotreData.length > 0) {
      res
        .status(202)
        .json({ status: true, User: sotreData, length: sotreData.length });
    } else {
      res.status(202).json({ status: false });
    }
  } catch (e) {
    console.log(e);
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }
};

exports.StoreData = StoreData;
exports.Login = Login;
exports.OptVer = OptVer;
exports.Company = Company;
exports.nameEmail = nameEmail;
exports.CompanyLicense = CompanyLicense;
exports.WhatsAppNumber = WhatsAppNumber;
