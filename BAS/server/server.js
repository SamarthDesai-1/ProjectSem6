const express = require('express');
const connectDB = require('./database/connection');
const cors = require('cors');
const mail = require("./services/SendMailOTP");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello from express" });
});

/* Connect to MongoDB database */ connectDB();

app.use("/test", require("./routes/signup_route"));
app.use("/test/api/users", require("./routes/login_route"));


app.listen(PORT, () => {
  console.log(`App listenning at ${PORT}`);
});
