const nodemailer = require("nodemailer");
const generateOTP = require("../OTP/GenerateOtp");

const OTP = generateOTP(6);

const SendMail = async () => {

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
    console.log(result);

  } catch (error) {
    console.log("Error : ", error);
  }

};
module.exports = SendMail;