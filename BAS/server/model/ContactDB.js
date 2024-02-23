const mongoose = require("mongoose");

let schema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Mobile: {
    type: String,
    required: true
  },
  Subject: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  }
});

const UserContact = new mongoose.model("usercontact", schema);

module.exports = UserContact;