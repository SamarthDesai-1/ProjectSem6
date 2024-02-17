const UserSignupSchema = require("../model/SignupDB");
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const randomstring = require('randomstring');
const sendMail = require("../services/SendMailResetPassword");


const key = "secretkey";

function generateToken(request) {
  const userOBJ = {
    email: request.body.email,
    password: request.body.password
  };

  return JWT.sign({ userOBJ }, key);
}

exports.validateUser = (request, response) => {
  const user = UserSignupSchema.find({ Email: request.body.email });

  user.then(data => {
    if (data.length == 1) {

      bcrypt.compare(request.body.password, data[0].Password, (error, result) => {

        if (error) {
          console.log(error);
          return response.status(200).send({ msg: "error occured" ,error: error });
        }

        if (result) {
          console.log(`Valid user, welcome to transact`);

          const token = generateToken(request);
          response.cookie("Name", token);
          return response.send({ msg: "Cookie set successfully" });
        }
        else {
          console.log(`Invalid password`);
          return response.status(200).send({ msg: "Invalid password" });
        }

      });

    }
    else if (data.length == 0) {
      response.status(404).send({ msg: "First signup than login you are not register yet kindly register" });
    }
  });
};

exports.verifyUser = (request, response) => {

  const cookieValue = request.cookies.Name;
  console.log(cookieValue);

  JWT.verify(cookieValue, key, (error, decode) => {

    if (error) {
      return response.status(401).send({ error: "Unauthorized: Invalid token" });
    }
    else {
      return response.send("Welcome to the home page");
    }
  });

};

exports.forgetPassword = async (request, response) => {


  const email = request.body.email;
  const user = UserSignupSchema.find({ Email: email });


  user.then(data => {
    console.log(data);
    if (data.length == 1) {
      console.log("when data.length == 1");
      const randomString = randomstring.generate();

      const update = async (randomString, email) => {
        await UserSignupSchema.updateOne({ Email: email }, { $set: { Token: randomString } });

        console.log(`data updated successfully`);
      }

      update(randomString, data[0].Email);

      sendMail(data[0].Email, response, randomString);
      response.status(200).send({ msg: "Please check your indox of mail and reset your password" });
    }
    else {
      return response.status(200).send({ msg: "Not found email ID" });
    }

  }).catch(error => {
    return response.status(200).send({ success: true, msg: `${error.message} this email not exists` });
  });


};

exports.resetPassword = async (request, response) => {

  try {
    const token = request.query.token;
    await UserSignupSchema.find({ Token: token }).then(async data => {
      if (data.length == 1) {
        const password = request.body.password;

        const passwordHASH = async (newPassword) => {
          const hashPassword = await bcrypt.hash(newPassword, 12);
          return hashPassword;
        }
        const newPassword = await passwordHASH(password);

        await UserSignupSchema.findByIdAndUpdate(data[0]._id, { $set: { Password: newPassword, Token: '' } }, { new: true });

        response.status(200).send({ success: true, msg: "User password has been reset", data: data });
      }
      else {
        response.status(200).send({ success: true, msg: "This link has been expires" });
      }
    });
  }
  catch (error) {
    return response.status(200).send({ msg: error.message });
  }

};