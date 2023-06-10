const express = require("express");
const { validationResult } = require("express-validator");
const HttpError = require("./../models/HttpError");
const axios = require("axios");

// models
const Seller = require("./../models/Seller");
const Store = require("./../models/Store");
const Items = require("./../models/Items");

// Endpoint for /search
const search = async (req, res, next) => {
  // Set fulfillment type as CoD and collection amount
  req.body.intent.fulfillment.type = "CoD";
  req.body.payment["@ondc/org/collection_amount"] = "150";
  res.json(req.body);
};

// Endpoint for /on_search
const on_search = async (req, res, next) => {
  // Identify catalog items available on CoD
  const codItems = req.body.items.filter(
    (item) => item["@ondc/org/available_on_cod"] === true
  );
  res.json({ codItems });
};

// Endpoint for /confirm
const confirm = async (req, res, next) => {
  // Update payment details and settlement information
  req.body.payment.type = "ON-FULFILLMENT";
  req.body.payment.collected_by = "BPP";
  req.body.payment.params.currency = "INR";
  req.body.payment.params.amount = "5.0";
  req.body.payment.status = "NOT-PAID";
  req.body.payment["@ondc/org/buyer_app_finder_fee_type"] = "percent";
  req.body.payment["@ondc/org/buyer_app_finder_fee_amount"] = "3.0";
  req.body.payment["@ondc/org/settlement_details"] = [
    {
      settlement_counterparty: "buyer-app",
      settlement_phase: "sale-amount",
      settlement_type: "upi",
      upi_address: "gft@oksbi",
      settlement_bank_account_no: "XXXXXXXXXX",
      settlement_ifsc_code: "XXXXXXXXX",
      beneficiary_name: "xxxxx",
      bank_name: "xxxx",
      branch_name: "xxxx",
    },
  ];
  res.json(req.body);
};

// Endpoint for /select
const select = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { context, message } = req.body;

  // Set payment mode as ON-FULFILLMENT
  message.order.payment.type = "ON-FULFILLMENT";
  let qt = message.order.item[0].quantity.count;

  let stockItem = await Items.find({
    _id: message.order.item[0].id,
    stock: { $gt: qt - 1 },
  });

  let response = {};

  if (stockItem.length > 0) {
    response = {
      context: {
        domain: context.domain,
        country: context.country,
        city: context.city,
        action: context.action,
        core_version: context.core_version,
        bap_id: context.bap_id,
        bap_uri: context.bap_uri,
        transaction_id: context.transaction_id,
        message_id: context.message_id,
        timestamp: context.timestamp,
        ttl: context.ttl,
      },
      message: {
        order: {
          id: message.order.id,
          items: [
            {
              id: message.order.item[0].id,
              quantity: {
                available: {
                  count: stockItem[0].stock,
                },
              },
            },
          ],
          fulfillment: {
            state: {
              descriptor: {
                code: "Serviceable",
              },
            },
          },
        },
      },
    };
  } else {
    response = {
      context: {
        domain: context.domain,
        country: context.country,
        city: context.city,
        action: context.action,
        core_version: context.core_version,
        bap_id: context.bap_id,
        bap_uri: context.bap_uri,
        transaction_id: context.transaction_id,
        message_id: context.message_id,
        timestamp: context.timestamp,
        ttl: context.ttl,
      },
      message: {
        order: {
          id: message.order.item[0].id,
          items: [
            {
              id: message.order.item[0].id,
              quantity: {
                available: {
                  count: 0,
                },
              },
            },
          ],
          fulfillment: {
            state: {
              descriptor: {
                code: "Non-serviceable",
              },
            },
          },
        },
      },
    };
  }

  const responseData = await axios.post(process.env.SELECT, response, {
    headers: {
      Authorization: "iUTpWtF68yckymVVY/aaXPHrMMPRz/dvYhXf3leVRI8=",
    },
  });

  console.log("-----------------response.message-----------------");
  console.log(response.message.order.items[0]);
  console.log(response.message.order.fulfillment.state.descriptor);

  res.status(202).json(responseData.data);
};

// Endpoint for /on_confirm
const on_confirm = async (req, res, next) => {
  // Update payment details and settlement information
  req.body.payment.type = "ON-FULFILLMENT";
  req.body.payment.collected_by = "BPP";
  req.body.payment.params.currency = "INR";
  req.body.payment.params.amount = "5.0";
  req.body.payment.status = "NOT-PAID";
  req.body.payment["@ondc/org/buyer_app_finder_fee_type"] = "percent";
  req.body.payment["@ondc/org/buyer_app_finder_fee_amount"] = "3.0";
  req.body.payment["@ondc/org/settlement_details"] = [
    {
      settlement_counterparty: "buyer-app",
      settlement_phase: "sale-amount",
      settlement_type: "upi",
      upi_address: "gft@oksbi",
      settlement_bank_account_no: "XXXXXXXXXX",
      settlement_ifsc_code: "XXXXXXXXX",
      beneficiary_name: "xxxxx",
      bank_name: "xxxx",
      branch_name: "xxxx",
    },
  ];
  res.json(req.body);
};

// Endpoint for /on_status and /on_update
const on_status = async (req, res, next) => {
  // app.post(["/on_status", "/on_update"], (req, res) => {

  // Update payment details and settlement information
  req.body.payment.type = "ON-FULFILLMENT";
  req.body.payment.collected_by = "BPP";
  req.body.payment.params.currency = "INR";
  req.body.payment.params.amount = "5.0";
  req.body.payment.params.transaction_id = "XXXXXXX";
  req.body.payment.status = "PAID";
  req.body.payment.time.timestamp = "2022-12-01T10:00:00.000Z";
  req.body.payment["@ondc/org/buyer_app_finder_fee_type"] = "percent";
  req.body.payment["@ondc/org/buyer_app_finder_fee_amount"] = "3.0";
  req.body.payment["@ondc/org/settlement_details"] = [
    {
      settlement_counterparty: "buyer-app",
      settlement_phase: "sale-amount",
      settlement_type: "upi",
      upi_address: "gft@oksbi",
      settlement_bank_account_no: "XXXXXXXXXX",
      settlement_ifsc_code: "XXXXXXXXX",
      beneficiary_name: "xxxxx",
      bank_name: "xxxx",
      branch_name: "xxxx",
      settlement_amount: "100",
      settlement_status: "PAID",
      settlement_reference: "XXXX",
      settlement_timestamp: "2022-12-06T00:00:00.000Z",
    },
  ];
  res.json(req.body);
};

exports.search = search;
exports.select = select;
exports.confirm = confirm;
exports.on_status = on_status;
exports.on_search = on_search;
exports.on_confirm = on_confirm;
