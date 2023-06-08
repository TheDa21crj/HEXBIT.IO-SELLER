const { validationResult } = require("express-validator");

const select = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { context, message } = req.body;

  res.status(202).json("Select");
};

exports.select = select;
