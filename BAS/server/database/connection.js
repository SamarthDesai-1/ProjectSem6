const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(
      "mongodb+srv://AdminBMS:imWuOVI70vi1ogFb@cluster0.crdvi5h.mongodb.net/Signup_Database?retryWrites=true&w=majority"
    );

    console.log(`Mongo DB connect : ${connectionString.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
