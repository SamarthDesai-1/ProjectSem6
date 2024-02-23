const checkConnection = require("../CheckConnections/CheckConnections");
const mongoose = require("mongoose");
const UserContact = require("../model/ContactDB");

exports.validateContactInfo = async (request, response) => {
  const Database = "Contact_Database";
  await mongoose.connection.close();
  await checkConnection(Database);

  const newContact = new UserContact({
    Name: request.body.name,
    Email: request.body.email,
    Mobile: request.body.mobile,
    Subject: request.body.subject,
    Message: request.body.message
  });

  await newContact.save().then(data => console.log(data)).catch(error => console.log(error));
  await mongoose.connection.close();

  return response.status(200).send({ msg: `Data inserted successfully` });
};