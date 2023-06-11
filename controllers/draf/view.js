const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Shop = require("../models/shop");

const SUCCESS = "Success";
const FAIL = "Fail";

// API Functions
router.get("/view", async (req, res) => {
  try {
    const user = getUserForRequest(req);

    const shops = await Shop.find({ userProfile: user }).lean();

    return res.status(200).json({ message: SUCCESS, shops });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: FAIL });
  }
});

router.post(
  "/create",
  [check("name").notEmpty().withMessage("Name is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: FAIL, errors: errors.array() });
      }

      const user = getUserForRequest(req);

      const shop = new Shop({
        userProfile: user,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
        incorporatioName: req.body.incorporatioName,
        incorporationType: req.body.incorporationType,
        gstin: req.body.gstin,
        pan: req.body.pan,
        phone: req.body.phone,
        email: req.body.email,
      });

      await shop.save();

      return res.status(200).json({ message: SUCCESS, shop: shop.name });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: FAIL });
    }
  }
);

router.put("/update/:id", async (req, res) => {
  try {
    const user = getUserForRequest(req);
    const shop = await Shop.findOne({
      _id: req.params.id,
      userProfile: user,
    }).lean();

    if (!shop) {
      return res.status(404).json({ message: FAIL });
    }

    shop.name = req.body.name || shop.name;
    shop.city = req.body.city || shop.city;
    shop.state = req.body.state || shop.state;
    shop.accountNumber = req.body.accountNumber || shop.accountNumber;
    shop.ifscCode = req.body.ifscCode || shop.ifscCode;
    shop.incorporatioName = req.body.incorporatioName || shop.incorporatioName;
    shop.incorporationType =
      req.body.incorporationType || shop.incorporationType;
    shop.gstin = req.body.gstin || shop.gstin;
    shop.pan = req.body.pan || shop.pan;
    shop.phone = req.body.phone || shop.phone;
    shop.email = req.body.email || shop.email;

    await Shop.updateOne({ _id: req.params.id }, shop);

    return res.status(200).json({ message: SUCCESS });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: FAIL });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const user = getUserForRequest(req);
    const ids = req.body.ids || [];

    const shops = await Shop.find({
      _id: { $in: ids },
      userProfile: user,
    }).lean();

    if (ids.length !== shops.length) {
      return res.status(400).json({ message: FAIL });
    }

    await Shop.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({ message: SUCCESS });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: FAIL });
  }
});

// Helper function to get user from request
function getUserForRequest(req) {
  // Implement your logic to retrieve the user for the request
}

module.exports = router;
