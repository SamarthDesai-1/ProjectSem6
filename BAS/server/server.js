const express = require('express');
const cors = require('cors');
const mail = require("./services/SendMailOTP");
const cookieParser = require("cookie-parser");
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'BMS', resave: false, saveUninitialized: true }));

app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello from express" });
});

/* Connect to Mongo DB  */ 

app.use("/test/api/users", require("./routes/signup_route"));
app.use("/test/api/users", require("./routes/login_route"));
// app.use("/test/api/users", require("./routes/accountopen_route"));
app.use("/test/api/users", require("./routes/contact_route"));



app.listen(PORT, () => {
  console.log(`App listenning at ${PORT}`);
});



