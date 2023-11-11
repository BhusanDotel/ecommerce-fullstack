const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  //this is because i dont know the structure of array and schema is unknown. it creates dynamic schema
  cartData: mongoose.Schema.Types.Mixed,
});

const orderData = mongoose.model("Orders", orderSchema);

module.exports = orderData;
