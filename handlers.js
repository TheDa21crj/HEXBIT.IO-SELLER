const ondc = require("ondc-node");

const onSearch = async (req, res) => {
  // Use the req.body to find the result of search
  let result = await Search(req.body);

  console.log(result);

  // The result should be in correct schema as per ONDC spec
  res.status(200).send(result);
};
const onInit = async (req, res) => {
  // Use the req.body to init a transaction (create transactionId)
  let result = await Init(req.body);
  // The result should be in correct schema as per ONDC spec
  res.status(200).send(result);
};

module.exports = {
  onSearch,
  onInit,
};
