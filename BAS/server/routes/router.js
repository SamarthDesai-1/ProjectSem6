const express = require("express");
const controller = require("../controller/controller");
const expressValidator = require("express-validator");
const { expressionName, expressionEmail, expressionPassword } = require('../validation/SignupExpressions');
const route = express.Router();


route.post("/api/users/signup", [

  expressValidator.query("Fname").isLength({ min: 1, max: 20 }).matches(expressionName),
  expressValidator.query("Lname").isLength({ min: 1, max: 20 }).matches(expressionName),
  expressValidator.query("email").isString().notEmpty().matches(expressionEmail),
  expressValidator.query("password").isString().notEmpty().matches(expressionPassword)

], (request, response, next) => {
  const {
    query: { filter, value }
  } = request;

  const result = expressValidator.validationResult(request);
  console.log(result);

  if (result.errors.length == 0) {
    console.log("Success");

    request.validData = {
      Fname: request.query.Fname,
      Lname: request.query.Lname,
      email: request.query.email,
      password: request.query.password
    };
    response.status(200).send({ msg: "Valid data" });
    next();
  }
  else if (result.errors.length >= 4) {
    response.status(404).send({ msg: "First fill the form for signup" });
  }
  else {
    if (result.errors[0].path == "Fname") {
      response.status(404).send({ msg: "Please enter valid first name" });
    }
    else if (result.errors[0].path == "Lname") {
      response.status(404).send({ msg: "Please enter valid last name" });
    }
    else if (result.errors[0].path == "email") {
      response.status(404).send({ msg: "Please enter valid email" });
    }
    else if (result.errors[0].path == "password") {
      response.status(404).send({ msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    }
  }
  next();
}, controller.greet);

module.exports = route;