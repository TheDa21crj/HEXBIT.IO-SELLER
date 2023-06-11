const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Shop = require("../models/shop");

const SUCCESS = "Success";
const FAIL = "Fail";

// Create a shop
router.post(
  "/create",
  [body("name").notEmpty().withMessage("Name is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: FAIL, errors: errors.array() });
    }

    try {
      const shop = await Shop.create(req.body);
      return res.status(201).json({ message: SUCCESS, shop });
    } catch (error) {
      return res.status(500).json({ message: FAIL, error: error.message });
    }
  }
);

// Get a shop
router.get("/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: FAIL, error: "Shop not found" });
    }
    return res.status(200).json({ message: SUCCESS, shop });
  } catch (error) {
    return res.status(500).json({ message: FAIL, error: error.message });
  }
});

// Update a shop
router.put("/:id", async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!shop) {
      return res.status(404).json({ message: FAIL, error: "Shop not found" });
    }
    return res.status(200).json({ message: SUCCESS, shop });
  } catch (error) {
    return res.status(500).json({ message: FAIL, error: error.message });
  }
});

// Delete a shop
router.delete("/:id", async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: FAIL, error: "Shop not found" });
    }
    return res.status(200).json({ message: SUCCESS });
  } catch (error) {
    return res.status(500).json({ message: FAIL, error: error.message });
  }
});

module.exports = router;
