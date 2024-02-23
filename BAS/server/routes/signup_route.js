const express = require("express");
const controller = require("../controller/SignupControllers");
const expressValidator = require("express-validator");
const { expressionName, expressionEmail, expressionPassword } = require('../validation/RegularExpression');
const route = express.Router();

route.post("/signup", controller.validateUser);

/* Verify signup data and insert in database */ route.post("/verify", controller.verifyOTP);


module.exports = route;
