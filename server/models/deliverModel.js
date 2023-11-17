const mongoose = require("mongoose");

const deliverSchema = new mongoose.Schema({
  //this is because i dont know the structure of array and schema is unknown. it creates dynamic schema
  deliverData: mongoose.Schema.Types.Mixed,
});

const deliveryData = mongoose.model("Deliver", deliverSchema);

module.exports = deliveryData;
