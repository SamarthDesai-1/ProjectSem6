const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

let schema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Token: {
    type: String,
    default: ""
  }
});


schema.pre('save', async function(next) {
  
  if (this.isModified('Password')) {
    this.Password = await bcrypt.hash(this.Password, 12);
  }
  next();
});

const UserSignupSchema = mongoose.model("signupuser", schema);

module.exports = UserSignupSchema;


