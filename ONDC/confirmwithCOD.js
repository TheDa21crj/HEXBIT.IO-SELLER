// Import necessary packages and modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint for /on_search
app.post("/on_search", (req, res) => {
  // Identify catalog items available on CoD
  const codItems = req.body.items.filter(
    (item) => item["@ondc/org/available_on_cod"] === true
  );
  res.json({ codItems });
});

// Endpoint for /select
app.post("/select", (req, res) => {
  // Set payment mode as ON-FULFILLMENT
  req.body.order.payment.type = "ON-FULFILLMENT";
  res.json(req.body);
});

// Endpoint for /search
app.post("/search", (req, res) => {
  // Set fulfillment type as CoD and collection amount
  req.body.intent.fulfillment.type = "CoD";
  req.body.payment["@ondc/org/collection_amount"] = "150";
  res.json(req.body);
});

// Endpoint for /confirm
app.post("/confirm", (req, res) => {
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
});

// Endpoint for /on_confirm
app.post("/on_confirm", (req, res) => {
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
});

// Endpoint for /on_status and /on_update
app.post(["/on_status", "/on_update"], (req, res) => {
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
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
