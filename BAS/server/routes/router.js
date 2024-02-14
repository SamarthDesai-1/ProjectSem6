const express = require("express");
const controller = require("../controller/controller");
const expressValidator = require("express-validator");
const route = express.Router();

route.post("/api/users/signup", [

  expressValidator.query("Fname").isLength({ min: 1, max: 20 }),
  expressValidator.query("Lname").isLength({ min: 1, max: 20 }),
  expressValidator.query("email").isString().notEmpty().isLength({ min: 5, max: 30 }),
  expressValidator.query("password").isString().notEmpty().isLength({ max: 9 })

], (request, response) => {

  const {
    query: { filter, value }
  } = request;

  const result = expressValidator.validationResult(request);
  console.log(result);

  if (result.errors.length == 0) {
    console.log("Success");
    response.status(200).send({ msg: "Valid data" });
  }
  else if (result.errors.length > 1) {
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
      response.status(404).send({ msg: "Please enter strong password" });
    }
  }

});

module.exports = route;