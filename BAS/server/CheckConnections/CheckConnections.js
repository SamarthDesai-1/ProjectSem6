const mongoose = require("mongoose");

const checkConnection = async (database) => {

  const connectionString = await mongoose.connect(`mongodb+srv://AdminBMS:imWuOVI70vi1ogFb@cluster0.crdvi5h.mongodb.net/${database}?retryWrites=true&w=majority`);

  if (connectionString) {
    console.log('Connection to MongoDB Atlas is now open');
    console.log(`Mongo DB connect to ${database} : ${connectionString.connection.host}`);
  }
  else {
    console.error('Error connecting to MongoDB Atlas');
    return;
  }
};

module.exports = checkConnection;
