const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const expressValidator = require('express-validator');
const { expressionEmail, expressionMobile, expressionName } = require('../validation/RegularExpression');
const controller = require("../controller/ContactController");

const verifyArray = [
  expressValidator.body("name").isString().notEmpty().matches(/^[a-zA-Z ]{0,99}$/),
  expressValidator.body("email").isString().notEmpty().matches(expressionEmail),
  expressValidator.body("mobile").isString().notEmpty().matches(expressionMobile),
  expressValidator.body("subject").isString().notEmpty().isLength({ min: 10 }),
  expressValidator.body("message").isString().notEmpty().isLength({ min: 20 }),
];

route.post("/send-user-query", verifyArray, (request, response, next) => {
  const result = expressValidator.validationResult(request);
  if (result.errors.length == 0) {
    next();
  }
  else if (result.errors.length >= 5) {
    return response.status(404).send({ msg: "First fill the form for contact" });
  }
  else if (result.errors[0].path == "email") {
    return response.status(404).send({ msg: "Please enter valid email" });
  }
  else if (result.errors[0].path == "name") {
    return response.status(404).send({ msg: "Your name should only contains Alphabetically letters" });
  }
  else if (result.errors[0].path == "mobile") {
    return response.status(404).send({ msg: "Please enter valid mobile" });
  }
  else if (result.errors[0].path == "subject") {
    return response.status(404).send({ msg: "Subject not should be empty and minimum 10 characters are required" });
  }
  else if (result.errors[0].path == "message") {
    return response.status(404).send({ msg: "Message not should be empty and minimum 20 characters are required" });
  }
}, controller.validateContactInfo);

module.exports = route;