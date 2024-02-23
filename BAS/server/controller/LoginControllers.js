const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");
const randomstring = require('randomstring');
const sendMail = require("../services/SendMailResetPassword");
const checkConnection = require("../CheckConnections/CheckConnections");
const mongoose = require("mongoose");

const key = "secretkey";

function generateToken(request) {
  const userOBJ = {
    email: request.body.email,
    password: request.body.password
  };
  
  return JWT.sign({ userOBJ }, key);
}

exports.validateUser = async (request, response) => {
  const UserSignupSchema = require("../model/SignupDB");
  const Database = "Signup_Database";
  await mongoose.connection.close();
  await checkConnection(Database);
  await UserSignupSchema.find({ Email: request.body.email }).then(data => {
    if (data.length == 1) {

      bcrypt.compare(request.body.password, data[0].Password, (error, result) => {

        if (error) {
          console.log(error);
          return response.status(200).send({ msg: "error occured", error: error });
        }

        if (result) {
          console.log(`Valid user, welcome to transact`);

          const token = generateToken(request);
          response.setHeader('Authorization', `Bearer ${token}`);
          response.cookie("Name", token);
          response.cookie("Email", request.body.email);

          return response.send({ msg: "Cookie set successfully", Token: token });
        }
        else {
          console.log(`Invalid password`);
          return response.status(404).send({ msg: "Invalid password" });
        }

      });
    }
  });
  await mongoose.connection.close();
};

exports.verifyUser = (request, response) => {
  const cookieValue = request.cookies.Name;
  console.log(cookieValue);

  try {
    JWT.verify(cookieValue, key, (error, decode) => {

      if (error) {
        return response.status(401).send({ error: "Unauthorized: Invalid token" });
      }
      else {
        request.session.username = request.cookies.Email;
        response.cookie("Email", null, { expires: new Date(0) });
        return response.send(`Welcome to the home page : ${request.session.username}`);
      }
    });
  } catch (error) {
    return response.status(401).send({ error: "Please authenticate a valid token" });
  }
  
};

exports.forgetPassword = async (request, response) => {
  const UserSignupSchema = require("../model/SignupDB");
  const Database = "Signup_Database";
  await mongoose.connection.close();
  await checkConnection(Database);
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
  await mongoose.connection.close();
};

exports.resetPassword = async (request, response) => {
  const UserSignupSchema = require("../model/SignupDB");
  const Database = "Signup_Database";
  await mongoose.connection.close();
  await checkConnection(Database);
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
      await mongoose.connection.close();
    });
  }
  catch (error) {
    return response.status(200).send({ msg: error.message });
  }

};
