const { validationResult } = require("express-validator");

// /select - buyer app specifies the items & quantity selected by a buyer;
const select = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { context, message } = req.body;

  // Prepare the response payload
  const response = {
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
      sellers: sellersInCity,
      finder_fee: finderFee,
    },
  };

  const responseData = await axios.post(
    "https://virtserver.swaggerhub.com/ONDCTech/ONDC-Protocol-Core/1.0.0/select",
    response,
    {
      headers: {
        Authorization: "iUTpWtF68yckymVVY/aaXPHrMMPRz/dvYhXf3leVRI8=",
      },
    }
  );

  // Send the response
  console.log(responseData);

  res.status(202).json(responseData.data);
};
exports.select = select;
