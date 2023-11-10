const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/KindimNaTaDB")
  .then(() => {
    console.log("Mongodb connected: localhost:27017");
  })
  .catch((e) => {
    console.log("Error", e);
  });

app.use("/api/admin", productRoutes);
app.use("/api", authRoutes);
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
