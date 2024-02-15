const express = require('express');
const connectDB = require('./database/connection');
const cors = require('cors');
const mail = require("./services/SendMail");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello from express" });
});

/* Connect to MongoDB database */ connectDB();

app.use("/test", require("./routes/router"));

app.listen(PORT, () => {
  console.log(`App listenning at ${PORT}`);
});
