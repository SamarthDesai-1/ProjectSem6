const UserSignupSchema = require("../model/SignupDB");

exports.insert = (request, response) => {
  console.log(`Execute`);

  console.log(request.validData);
  if (!request.validData) {
    response.status(400).send({ msg: `Data not found or recevied` });
    return;
  }

  const newUser = new UserSignupSchema({
    FirstName: request.validData.fname,
    LastName: request.validData.lname,
    Email: request.validData.email,
    Password: request.validData.password,
  });

  
  /* Save user in database */
  newUser.save(newUser).then((data) => console.log(data)).catch((error) => console.log(error));

  return response.status(200).send({ msg: `Data inserted successfully` });
};
