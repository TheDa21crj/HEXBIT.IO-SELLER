const express = require("express");
const { validationResult } = require("express-validator");
const HttpError = require("./../models/HttpError");
const axios = require("axios");

const init = async ()=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}