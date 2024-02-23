const generateOTP = require("../OTP/GenerateOtp");
const sendEmail = require("../services/SendMailOTP");
const checkConnection = require("../CheckConnections/CheckConnections");
const mongoose = require("mongoose");

const OBJ = {
  serverOTP: null,
  SignupData: null
};

exports.validateUser = async (request, response) => {
  const UserSignupSchema = require("../model/SignupDB");
  const Database = "Signup_Database";
  await mongoose.connection.close();
  await checkConnection(Database);
  console.log(`Execute`);

  if (!request.body) {
    response.status(400).send({ msg: `Data not found or recevied` });
    return;
  }

  const newUserEmail = await UserSignupSchema.findOne({ Email: request.body.email });

  if (newUserEmail) {
    response.status(404).send({ msg: `Email already exists` });
    return;
  }

  const OTP = generateOTP(6);
  OBJ.SignupData = request.body;
  OBJ.serverOTP = OTP;

  sendEmail(request, response, OTP);
  await mongoose.connection.close();
};


exports.verifyOTP = async (request, response) => {
  const UserSignupSchema = require("../model/SignupDB");
  const Database = "Signup_Database";
  await mongoose.connection.close();
  await checkConnection(Database);
  const { otp } = request.body;

  if (otp === undefined) {
    response.status(404).send({ msg: "OTP is required" });
    return;
  }

  if (otp === OBJ.serverOTP) {

    const newUser = new UserSignupSchema({
      FirstName: OBJ.SignupData.fname,
      LastName: OBJ.SignupData.lname,
      Email: OBJ.SignupData.email,
      Password: OBJ.SignupData.password,
    });

    /* Save user in database */
    await newUser.save().then((data) => console.log(data)).catch((error) => console.log(error));

    await mongoose.connection.close();

    return response.status(200).send({ msg: `Data inserted successfully` });
  }
  return response.status(404).send({ msg: "OTP is not valid try after some time" });
};
