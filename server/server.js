const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const serveStatic = require("serve-static");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(
      `Connected to MongoDB ! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(error => {
    console.error("Error while connecting to MongoDB !", error);
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/owners", require("./routes/owners"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/addresses", require("./routes/addresses"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/orders", require("./routes/orders"));

//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT} !`);
});
