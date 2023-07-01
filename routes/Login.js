const express = require("express");
const auth = require("../middleWare/auth");
const { check } = require("express-validator");
const LoginController = require("../controllers/LoginController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();



//file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/images")) {
      fs.mkdirSync("public/images");
    }

    cb(null, "public/images");
    // cb(null, path.resolve(__dirname, "public/videos"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    console.log(ext);

    if (
      ext != ".png" &&
      ext != ".jpeg" &&
      ext != ".jpg"
    ) {
      return cb(new Error("Only videos and audio are allowed!"));
    }
    cb(null, true);
  },
});

// Register Seller
router.post(
  "/register",
  [check("name", "name is Required").not().isEmpty()],
  [check("email", "email is Required").not().isEmpty()],
  [check("Pan", "Pan is Required").not().isEmpty()],
  [check("WhatsAppNumber", "WhatsAppNumber is Required").not().isEmpty()],
  [check("CompanyName", "CompanyName is Required").not().isEmpty()],
  [check("CompanyType", "CompanyType is Required").not().isEmpty()],
  [check("License", "License is Required").not().isEmpty()],
  [check("password", "password is Required").not().isEmpty()],
  LoginController.registerUser
);

// Login Seller
router.post(
  "/login",
  [check("email", "email is Required").not().isEmpty()],
  [check("password", "password is Required").not().isEmpty()],
  LoginController.login
);

// Add Store
router.post(
  "/AddStore",
  [check("StoreName", "StoreName is Required").not().isEmpty()],
  [check("StoreType", "StoreType is Required").not().isEmpty()],
  [check("Website", "Website is Required").not().isEmpty()],
  [check("StoreDescription", "StoreDescription is Required").not().isEmpty()],
  [check("name", "name is Required").not().isEmpty()],
  [check("city", "city is Required").not().isEmpty()],
  [check("state", "state is Required").not().isEmpty()],
  [check("country", "country is Required").not().isEmpty()],
  [check("area_code", "area_code is Required").not().isEmpty()],
  LoginController.AddStore
);

// Add Item
router.post(
  "/AddItem",
  [check("name", "name is Required").not().isEmpty()],
  [check("price", "price is Required").not().isEmpty()],
  [check("stock", "stock is Required").not().isEmpty()],
  [check("type", "type is Required").not().isEmpty()],
  [check("Img", "Img is Required").not().isEmpty()],
  [check("des", "des is Required").not().isEmpty()],
  [check("StoreID", "StoreID is Required").not().isEmpty()],
  upload.fields([{
    name: "Img",
    maxCount:1
  }]),
  LoginController.AddItem
);

router.use(auth);

module.exports = router;
