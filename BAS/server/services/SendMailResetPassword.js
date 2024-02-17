const nodemailer = require("nodemailer");

const SendMail = async (email, response, token) => {

  console.log(`Email : ${email}`);
  
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
    // to: `${email}`,
    to: "samarthdesain@gmail.com",
    subject: "Hello from Transact LTD",
    text: "Email for reset your password",
    html: '<p>Hii samarthdesain@gmail.com , please copy the link <a href="https://localhost:5000/test/api/users/reset-password?token=' + token + '"> and reset your password</p>'
  };

  try {
    const result = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(`Email send successfully : ${info.response}`);
      }
    });
    // return response.status(200).send({ msg: `Email send successfully to your ${request.body.email}` });
    
  } catch (error) {
    response.status(404).send({ msg: "Not able to send Email" });
    return;
  }

};

module.exports = SendMail;