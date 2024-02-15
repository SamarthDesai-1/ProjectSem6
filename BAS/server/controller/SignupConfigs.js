const UserSignupSchema = require("../model/SignupDB");
const SendMail = require("../services/SendMail");
const nodemailer = require("nodemailer");
const generateOTP = require("../OTP/GenerateOtp");

const OBJ = {
  serverOTP: null,
  SignupData: null
};

exports.validateUser = async (request, response) => {
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
  
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "transactorgltd@gmail.com",
      pass: "poum grxa duvv ienc"
    }
  });

  const mailOptions = {
    from: "transactorgltd@gmail.com",
    to: "samarthdesain@gmail.com",
    subject: "Hello from Transact LTD",
    text: `Do not share this OTP to anyone : ${OTP}`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Email send successfully`);
    return response.status(200).send({ msg: "Email send successfully to your email-ID" });
    
  } catch (error) {
    response.status(404).send({ msg: "Not able to send Email" });
    return;
  }

};


exports.verifyOTP = (request, response) => {
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
    newUser.save().then((data) => console.log(data)).catch((error) => console.log(error));

    return response.status(200).send({ msg: `Data inserted successfully` });
  }
  return response.status(404).send({ msg: "OTP is not valid try after some time" });
};