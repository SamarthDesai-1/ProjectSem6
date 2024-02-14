const express = require("express");
const controller = require("../controller/controller");
const expressValidator = require("express-validator");
const { expressionName, expressionEmail, expressionPassword } = require('../validation/SignupExpressions');
const route = express.Router();


route.post("/api/users/signup", [

  expressValidator.query("fname").notEmpty().matches(expressionName).isLength({ max: 10 }),
  expressValidator.query("lname").notEmpty().matches(expressionName).isLength({ max: 10 }),
  expressValidator.query("email").isString().notEmpty().matches(expressionEmail),
  expressValidator.query("password").isString().notEmpty().matches(expressionPassword),
  expressValidator.query("cpassword").isString().notEmpty().matches(expressionPassword),

], (request, response, next) => {
  const {
    query: { filter, value }
  } = request;

  const result = expressValidator.validationResult(request);
  console.log(result);

  if (result.errors.length == 0) {
    console.log("Success");

    if (request.query.password !== request.query.cpassword) {
      return response.status(404).send({ msg: "Retype password not match with confirm password" });
    }

    request.validData = {
      fname: request.query.fname,
      lname: request.query.lname,
      email: request.query.email,
      password: request.query.password,
    };
    console.log(`Valid data`);
    next();
  }
  else if (result.errors.length >= 4) {
    return response.status(404).send({ msg: "First fill the form for signup" });
  }
  else {
    if (result.errors[0].path == "fname") {
      return response.status(404).send({ msg: "Please enter valid first name" });
    }
    else if (result.errors[0].path == "lname") {
      return response.status(404).send({ msg: "Please enter valid last name" });
    }
    else if (result.errors[0].path == "email") {
      return response.status(404).send({ msg: "Please enter valid email" });
    }
    else if (result.errors[0].path == "password" || result.errors[0].path == "cpassword") {
      return response.status(404).send({ msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    }
  }
  
}, controller.insert);

module.exports = route;