// Endpoint for /on_init
app.post("/on_init", (req, res) => {
  // Extract the necessary information from the request
  const orderId = req.body.message.order.id;
  const transactionId = req.body.context.transaction_id;

  // Perform any necessary logic or validations for order initialization

  // Prepare the response
  const response = {
    context: req.body.context,
    message: {
      order_id: orderId,
      transaction_id: transactionId,
      status: "INITIALIZED",
    },
  };

  res.json(response);
});

// Endpoint for /confirm
app.post("/confirm", (req, res) => {
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
});

// Endpoint for /status
app.post("/status", (req, res) => {
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
});

// Function to query the order status using the transaction ID
function queryOrderStatus(transactionId) {
  // Perform the necessary logic to query the order status
  // This can involve interacting with databases, external APIs, or other processes

  // For demonstration purposes, let's assume a static status of "DELIVERED"
  return "DELIVERED";
}
