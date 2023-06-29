const express = require("express");
const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const HttpError = require("./../../models/HttpError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const xlsx = require("xlsx");
const path = require("path");
const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_SERVICE_SID} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true
})

// models
const Seller = require("./../../models/Seller");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");

const WhatsAppNumber = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { WhatsAppNumber, countryCode } = req.body;

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
      const sentOtp = await client.verify.v2.services(TWILIO_SERVICE_SID).verifications.create({
        to: `+${countryCode}${WhatsAppNumber}`,
        channel: "sms",
      });
      console.log(sentOtp);
      res.json({ exists: false, user: userinfo, message:sentOtp});
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

  const { WhatsAppNumber, Otp, countryCode } = req.body;

  let users;

  try {
    users = await Seller.findOne({ WhatsAppNumber });

    if (users) {
      console.log(Otp, "=========", WhatsAppNumber);
      try{
        const verifiedOtp = await client.verify.v2.services(TWILIO_SERVICE_SID).verificationChecks.create({
          to: `+${countryCode}${WhatsAppNumber}`,
          code: Otp,
        })
        console.log(verifiedOtp);
        if(verifiedOtp.valid == true)
        {
          return res.status(200).json({message:"Otp verified successfully"});

        }
        else{
          return res.status(400).json({message:"Wrong otp"})

        }
      }catch(err)
      {
        return res.status(400).json({message:"Something went wrong"})

      }
    } else {
      res.status(304).json({ message: "User do not exists" });
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
    users = await Seller.findOne({ WhatsAppNumber });

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

        res.status(202).json({ status: true, token: token });
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

exports.OptVer = OptVer;
exports.Company = Company;
exports.nameEmail = nameEmail;
exports.CompanyLicense = CompanyLicense;
exports.WhatsAppNumber = WhatsAppNumber;
