const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

const dbConfig = require("./config/dev");

mongoose
  .connect(dbConfig.MONGO_URI, {
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

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT} !`);
});
