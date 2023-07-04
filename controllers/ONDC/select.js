const { validationResult } = require("express-validator");
const axios = require("axios");

// models
const Seller = require("./../../models/Seller");
const Store = require("./../../models/Store");
const Items = require("./../../models/Items");


const select = async(req,res)=>{
    const {context,message} = req.body;
    const id = message.order.id;
    const response = {
        context:context,
        message:{
            orderId:id
        }
    }
    const responseData = await axios.post(
        "https://virtserver.swaggerhub.com/ONDCTech/ONDC-Protocol-Core/1.0.0/on_select",
        response,
        {
          headers: {
            Authorization: process.env.Authorization,
          },
        }
    );
    console.log(responseData);
    res.status(200).json({
        message: {
          ack: {
            status: "ACK",
          },
        },
        error: {
          type: "CONTEXT-ERROR",
          code: "string",
          path: "string",
          message: "string",
        },
      });
}

exports.select = select;