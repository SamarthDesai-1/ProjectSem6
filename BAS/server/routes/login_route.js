const express = require("express");
const expressValidator = require('express-validator');
const { expressionEmail, expressionPassword } = require('../validation/RegularExpression');
const controller = require("../controller/LoginControllers");

const route = express.Router();

const verifyArray = [
  expressValidator.body("email").isString().notEmpty().matches(expressionEmail),
  expressValidator.body("password").isString().notEmpty().matches(expressionPassword),
];


route.post("/login", controller.validateUser);


route.post("/forget-password", verifyArray[0], async (request, response, next) => {
  const result = expressValidator.validationResult(request);
  if (result.errors.length == 0) {
    next();
  }
  else if (result.errors.length >= 2) {
    return response.status(404).send({ msg: "First type the email" });
  }
  else if (result.errors[0].path == "email") {
    return response.status(404).send({ msg: "Please enter valid email" });
  }
}, controller.forgetPassword); 


route.get("/reset-password",verifyArray[1], async (request, response, next) => {
  const result = expressValidator.validationResult(request);
  if (result.errors.length == 0) {

    if (request.body.password !== request.body.cpassword) {
      return response.status(404).send({ msg: "Retype password not match with confirm password" });
    }
    next();
  }
  else if (result.errors[0].path == "password" || result.errors[0].path == "cpassword") {
    return response.status(404).send({ msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
  }
}, controller.resetPassword); 


route.get("/profile", controller.verifyUser);


module.exports = route;