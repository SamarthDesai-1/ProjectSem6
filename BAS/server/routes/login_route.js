const express = require("express");
const expressValidator = require('express-validator');
const { expressionEmail, expressionPassword } = require('../validation/RegularExpression');
const controller = require("../controller/LoginControllers");
const sendMailResetPassword = require('../services/SendMailResetPassword');

const route = express.Router();


/**
 * details -> email ,password = done
 * forget password
 * generate JWT token = done
 */

route.post("/login", [

  expressValidator.body("email").isString().notEmpty().matches(expressionEmail),
  expressValidator.body("password").isString().notEmpty().matches(expressionPassword),

], (request, response, next) => {

  const result = expressValidator.validationResult(request);

  if (result.errors.length == 0) {
    
    next();

  }
  else if (result.errors.length >= 2) {
    return response.status(404).send({ msg: "First fill the form for signup" });
  }
  else if (result.errors[0].path == "email") {
    return response.status(404).send({ msg: "Please enter valid email" });
  }
  else if (result.errors[0].path == "password") {
    return response.status(404).send({ msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
  }
}, controller.validateUser);

route.post("/profile", controller.verifyUser);


route.post("/forget-password", controller.forgetPassword); 
route.get("/reset-password", controller.resetPassword); 

route.get("/testJwt", controller.verifyUser);


module.exports = route;