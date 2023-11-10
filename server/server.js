const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

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

const productRoutes = require("./routes/productRoutes");
app.use("/api/admin", productRoutes);

app.get("/", (req, res) => {
  res.json({ username: "bhusan", age: 23 });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
