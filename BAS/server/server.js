const express = require('express');

const app = express();
const PORT = 5000;

app.get("/", (request, response) => {
  response.status(200).send({ msg: "Hello from express" });
});

app.use("/test", require("./routes/router"));

app.listen(PORT, () => {
  console.log(`App listenning at ${PORT}`);
});
