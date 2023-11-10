const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    img_name: String,
    source: String,
  },
  rating: {
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    count: {
      type: Number,
      required: true,
    },
  },
});

const ProductData = mongoose.model("Products", productSchema);

module.exports = ProductData;
