const mongoose = require("mongoose");

/**
 * Fetch first name and last name and email from signupDB
*/

let schema = new mongoose.Schema({
  Customer_id: {
    type: String,
    required: true,
    unique: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Currency: {
    type: String,
    required: true
  },
  AccountType: {
    type: String,
    required: true
  },
  Mobile: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  State: {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  }
});


let UserAccountOpenSchema = new mongoose.model("accountopenusers", schema);

module.exports = UserAccountOpenSchema;

