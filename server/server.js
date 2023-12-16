const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const ratingReviewRoutes = require("./routes/RatingReviewRoutes");
const initSocket = require("./SocketService");
const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_CLOUD_URL)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((e) => {
    console.log("Error", e);
  });

app.use("/api/admin", productRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", ratingReviewRoutes);

//to check status of server
app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log("App listening on port 3000!");
});
