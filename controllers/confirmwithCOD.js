const express = require("express");
const { validationResult } = require("express-validator");
const Seller = require("./../models/Seller");
const Store = require("./../models/Store");
const Items = require("./../models/Items");
const HttpError = require("./../models/HttpError");

// Endpoint for /on_search
const on_search = async (req, res, next) => {
  // Identify catalog items available on CoD
  const codItems = req.body.items.filter(
    (item) => item["@ondc/org/available_on_cod"] === true
  );
  res.json({ codItems });
};

// Endpoint for /select
const select = async (req, res, next) => {
  // Set payment mode as ON-FULFILLMENT
  req.body.order.payment.type = "ON-FULFILLMENT";
  res.json(req.body);
};

// Endpoint for /search
const search = async (req, res, next) => {
  // Set fulfillment type as CoD and collection amount
  req.body.intent.fulfillment.type = "CoD";
  req.body.payment["@ondc/org/collection_amount"] = "150";
  res.json(req.body);
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
exports.on_search = on_search;
exports.confirm = confirm;
exports.on_status = on_status;
exports.on_confirm = on_confirm;
