const nodemailer = require("nodemailer");

const SendMail = async (request, response, OTP) => {

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
    // to: `${request.body.email}`,
    to: "samarthdesain@gmail.com",
    subject: "Hello from Transact LTD",
    text: `Do not share this OTP to anyone : ${OTP}`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Email send successfully`);
    return response.status(200).send({ msg: `Email send successfully to your ${request.body.email}` });
    
  } catch (error) {
    response.status(404).send({ msg: "Not able to send Email" });
    return;
  }

};

module.exports = SendMail;