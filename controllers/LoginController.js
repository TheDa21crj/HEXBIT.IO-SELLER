const express = require("express");
const { validationResult } = require("express-validator");
const Seller = require("./../models/Seller");
const gravatar = require("gravatar");
const HttpError = require("./../models/HttpError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    email,
    image,
    Pan,
    WhatsAppNumber,
    CompanyName,
    CompanyType,
    License,
    password,
  } = req.body;

  try {
    users = await Seller.findOne({ email });
    console.log(users);
  } catch (e) {
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }

  if (users) {
    res.json({ exists: true });
    return;
  } else {
    let image;
    try {
      image = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    } catch (e) {
      const error = new HttpError("gravatar error", 400);
      return next(error);
    }

    const newUser = new Seller({
      name,
      email,
      image,
      Pan,
      WhatsAppNumber,
      CompanyName,
      CompanyType,
      License,
      password,
      Store: [],
    });
    try {
      // console.log(newEvent)
      const createduser = await newUser.save();
      let token;
      try {
        token = jwt.sign({ userEmail: email }, process.env.JWT_SECRATE, {
          expiresIn: "5hr",
        });
      } catch (err) {
        const error = new HttpError("Error logging user", 401);
        console.log(err);
        return next(error);
      }
      var userinfo = {
        name,
        pic: createduser.image,
        WhatsAppNumber,
        License,
        Pan,
      };
      res.json({ exists: false, token: token, user: userinfo });
    } catch (err) {
      console.log(err);
      const error = new HttpError("Cannot add user", 400);
      return next(error);
    }
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    var validateEmail = await Seller.findOne({ email });
  } catch (err) {
    const error = new HttpError("User not found", 500);
    return next(error);
  }

  if (validateEmail) {
    const isMatch = await bcrypt.compare(password, validateEmail.password);
    console.log("saveds :- " + validateEmail.password);

    if (!isMatch) {
      const error = new HttpError("Wrong credentials", 400);
      return next(error);
    } else {
      let token;
      try {
        token = jwt.sign(
          {
            userEmail: validateEmail.email,
          },
          process.env.JWT_SECRATE,
          { expiresIn: "3hr" }
        );
      } catch (err) {
        const error = new HttpError("Error error generating token", 401);
        console.log(err);
        return next(error);
      }
      var userinfo = {
        name: validateEmail.name,
        email: validateEmail.email,
        License: validateEmail.License,
        WhatsAppNumber: validateEmail.WhatsAppNumber,
      };

      res.status(200).json({ success: true, token: token, user: userinfo });
    }
  } else {
    const error = new HttpError("Wrong Email Credentials", 400);
    return next(error);
  }
};

const AddStore = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    StoreName,
    StoreType,
    Website,
    StoreDescription,
    door,
    name,
    building,
    street,
    locality,
    ward,
    city,
    state,
    country,
    area_code,
  } = req.body;

  const userEmail = res.locals.userData.userEmail;

  console.log(userEmail);

  res.status(202).json("Hello");
};

exports.login = login;
exports.AddStore = AddStore;
exports.registerUser = registerUser;
