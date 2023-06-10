const express = require("express");
const { validationResult } = require("express-validator");
const HttpError = require("./../models/HttpError");

// models
const Seller = require("./../models/Seller");
const Store = require("./../models/Store");
const Items = require("./../models/Items");

// Endpoint for /on_init
const on_init = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { context, message } = req.body;

  // // Extract the necessary information from the request
  const orderId = message.order.id;
  // const transactionId = message.context.transaction_id;

  // // Perform any necessary logic or validations for order initialization
  let stockItem = await Items.find({
    _id: message.order.item[0].id,
    stock: { $gt: qt - 1 },
  });

  let response = {};
  if (stockItem.length > 0) {
    // Prepare the response
    const response = {
      context: req.body.context,
      message: {
        order_id: orderId,
        transaction_id: transactionId,
        status: "Serviceable",
      },
    };
  } else {
    // Prepare the response
    const response = {
      context: req.body.context,
      message: {
        order_id: orderId,
        transaction_id: transactionId,
        status: "Non-Serviceable",
      },
    };
  }

  res.status(202).json(response);
};

// Endpoint for /confirm
const confirm = async (req, res, next) => {
  // Extract the necessary information from the request
  const orderId = req.body.message.order.id;
  const transactionId = req.body.context.transaction_id;

  // Perform any necessary logic or validations for order confirmation

  // Prepare the response
  const response = {
    context: req.body.context,
    message: {
      order_id: orderId,
      transaction_id: transactionId,
      status: "CONFIRMED",
    },
  };

  res.json(response);
};

// Endpoint for /status
const status = async (req, res, next) => {
  // Extract the order ID from the request
  const orderId = req.body.message.order_id;

  // Query the status of the order using the transaction ID
  const transactionId = req.body.context.transaction_id;
  const status = queryOrderStatus(transactionId);

  // Prepare the response
  const response = {
    context: req.body.context,
    message: {
      order_id: orderId,
      transaction_id: transactionId,
      status: status,
    },
  };

  res.json(response);
};

// Function to query the order status using the transaction ID
function queryOrderStatus(transactionId) {
  // Perform the necessary logic to query the order status
  // This can involve interacting with databases, external APIs, or other processes

  // For demonstration purposes, let's assume a static status of "DELIVERED"
  return "DELIVERED";
}

exports.status = status;
exports.confirm = confirm;
exports.on_init = on_init;
