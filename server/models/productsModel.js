const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    img_name: String,
    source: String,
  },
});

const ProductData = mongoose.model("Products", productSchema);

module.exports = ProductData;
