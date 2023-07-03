const axios = require("axios");
const { validationResult } = require("express-validator");
const orderSchema = require("../models/Order");

// Extract relevant data from the request
const update = async (req, res) => {
  const orderId = req.body.message.order.id;
  const itemUpdates = req.body.message.order.items;
  let order;

  // Process item updates
  itemUpdates.forEach(async (itemUpdate) => {
    const itemId = itemUpdate.id;
    const returnQuantity = itemUpdate.quantity.count;
    const reasonCode = itemUpdate.tags.reason_code;
    const updateType = itemUpdate.tags.update_type;
    const ttlApproval = itemUpdate.tags.ttl_approval;
    const ttlReverseQC = itemUpdate.tags.ttl_reverseqc;
    const images = itemUpdate.tags.image;

    // Perform necessary actions based on the item updates
    // Here, you can update your seller records with the return information,
    // handle the return process, update inventory, etc.
    console.log(itemId);
    const updatedValue = await orderSchema.updateOne(
      { "Items.ItemID": itemId },
      {
        $set: {
          Status: updateType,
        },
      },
      { upsert: true }
    );
    console.log(updatedValue);
    if (updatedValue.matchedCount === 1) {
      order = await findOrder(itemId);
    } else {
      return res.status(400).json({ messag: "Could not update" });
    }
  });

  const responseData = await axios.post(process.env.ON_UPDATE, order, {
    headers: {
      Authorization: process.env.Authorization,
    },
  });
  console.log(responseData.data);

  // Send a response back
 if(responseData.status === 200)
 {
   return res.status(200).json({message: "Order found",data:responseData.data});
 }
 else{
  return res.status(400).json({message:"Order not found"});
 }
};
const findOrder = async (itemId) => {
  try {
    const order = await orderSchema.findOne({ "Items.ItemID": itemId });
    return order;
  } catch (err) {
    console.log("error->", err);
  }
};

exports.update = update;
