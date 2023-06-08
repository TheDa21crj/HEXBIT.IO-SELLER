const { validationResult } = require("express-validator");

const select = async (req, res) => {
  res.status(202).json("Select");
};

exports.select = select;
