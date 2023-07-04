const express = require("express");
const { validationResult } = require("express-validator");
const HttpError = require("./../models/HttpError");
const axios = require("axios");

// models
const Seller = require("./../models/Seller");
const Store = require("./../models/Store");
const Items = require("./../models/Items");
const orders = require("./../models/Order");

// Endpoint for /on_init
const on_init = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { context, message } = req.body;

  // // Extract the necessary information from the request
  const orderId = message.order.id;
  const transactionId = context.transaction_id;

  // // Perform any necessary logic or validations for order initialization
  let qt = message.order.item[0].quantity.count;

  let stockItem = await Items.find({
    _id: message.order.item[0].id,
    stock: { $gt: qt - 1 },
  });

  let response = {};
  if (stockItem.length > 0) {
    // Prepare the response
    response = {
      context: req.body.context,
      message: {
        order_id: orderId,
        transaction_id: transactionId,
        status: "Serviceable",
      },
    };
  } else {
    // Prepare the response
    response = {
      context: req.body.context,
      message: {
        order_id: orderId,
        transaction_id: transactionId,
        status: "Non-Serviceable",
      },
    };
  }

  const responseData = await axios.post(process.env.ON_INIT, response, {
    headers: {
      Authorization: process.env.Authorization,
    },
  });

  res.status(202).json(responseData.data);
};

// Endpoint for /confirm
const confirm = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { context, message } = req.body;

  // Extract the necessary information from the request
  const orderId = message.order.id;
  const transactionId = context.transaction_id;

  let response = {};

  // Perform any necessary logic or validations for order confirmation
  if (message.order.state == "CONFIRMED") {
    // Prepare the response
    response = {
      context: context,
      message: {
        order_id: orderId,
        transaction_id: transactionId,
        state: "CONFIRMED",
      },
    };
  } else {
    // Prepare the response
    response = {
      context: context,
      message: {
        order_id: orderId,
        transaction_id: transactionId,
        state: "Cancelled",
      },
    };
  }

  const responseData = await axios.post(process.env.ON_CONFIRM, response, {
    headers: {
      Authorization: process.env.Authorization,
    },
  });

  console.log(response);

  res.status(202).json(responseData.data);
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

  const responseData = axios.post(process.env.ON_STATUS,response,{
    headers: {
      Authorization: process.env.Authorization,
    },
  })
  res.json(responseData.data);
};

// Function to query the order status using the transaction ID
async function queryOrderStatus(transactionId) {
  // Perform the necessary logic to query the order status
  // This can involve interacting with databases, external APIs, or other processes
  try{
    const order = await orders.findOne({transactionId: transactionId});
    const status = order.status;
    return status;

  }catch(err)
  {
    console.log(err);
    return "Error";
  }

  // For demonstration purposes, let's assume a static status of "DELIVERED"
}

exports.status = status;
exports.confirm = confirm;
exports.on_init = on_init;
