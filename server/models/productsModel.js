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
    raters: mongoose.Schema.Types.Mixed,
    totalStars: {
      type: Number,
    },
    stars: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  review: mongoose.Schema.Types.Mixed,
  trueCustomers: mongoose.Schema.Types.Mixed,
});

const ProductData = mongoose.model("Products", productSchema);

module.exports = ProductData;
