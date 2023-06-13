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

  // console.log(
  //   WhatsAppNumber,
  //   StoreName,
  //   StoreType,
  //   PinCode,
  //   Add,
  //   Locality,
  //   City,
  //   State,
  //   Country,
  //   StoreDescription,
  //   Website
  // );

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

        res.status(202).json({ status: true });
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

  // if (users) {
  //     res.json({ exists: true });
  //     return;
  // } else {
  // res.status(202).json({ status: false });

  //     let image;
  //     try {
  //       image = gravatar.url(WhatsAppNumber, { s: "200", r: "pg", d: "mm" });
  //     } catch (e) {
  //       const error = new HttpError("gravatar error", 400);
  //       return next(error);
  // }

  //     const newUser = new Seller({
  //       WhatsAppNumber,
  //       image,
  //       Store: [],
  //     });

  //     try {
  //       const createduser = await newUser.save();

  //       let token;
  //       try {
  //         token = jwt.sign(
  //           { userWhatsAppNumber: WhatsAppNumber },
  //           process.env.JWT_SECRATE,
  //           {
  //             expiresIn: "5hr",
  //           }
  //         );
  //       } catch (err) {
  //         const error = new HttpError("Error logging user", 401);
  //         console.log(err);
  //         return next(error);
  //       }

  //       var userinfo = {
  //         pic: createduser.image,
  //         WhatsAppNumber,
  //       };

  //       const OTP = Math.floor(Math.random() * 9000 + 1000);
  //       console.log(OTP);

  //       res.json({ exists: false, token: token, user: userinfo });
  //     } catch (err) {
  //       console.log(err);
  //       const error = new HttpError("Cannot add user", 400);
  //       return next(error);
  //     }
  //   }
};

exports.AddStore = AddStore;
