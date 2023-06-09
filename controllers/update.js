const axios = require("axios");
const { validationResult } = require("express-validator");

// Extract relevant data from the request
const update = async (req, res) => {
  const orderId = req.body.message.order.id;
  const itemUpdates = req.body.message.order.items;

  // Process item updates
  itemUpdates.forEach((itemUpdate) => {
    const itemId = itemUpdate.id;
    const returnQuantity = itemUpdate.quantity.count;
    const reasonCode = itemUpdate.tags.reason_code;
    const ttlApproval = itemUpdate.tags.ttl_approval;
    const ttlReverseQC = itemUpdate.tags.ttl_reverseqc;
    const images = itemUpdate.tags.image;

    // Perform necessary actions based on the item updates
    // Here, you can update your seller records with the return information,
    // handle the return process, update inventory, etc.

    console.log(`Order ID: ${orderId}`);
    console.log(`Item ID: ${itemId}`);
    console.log(`Return Quantity: ${returnQuantity}`);
    console.log(`Reason Code: ${reasonCode}`);
    console.log(`TTL Approval: ${ttlApproval}`);
    console.log(`TTL Reverse QC: ${ttlReverseQC}`);
    console.log(`Images: ${images}`);
  });

  // Send a response back
  res.status(200).json({ message: "Update received successfully" });
};

exports.update = update;
