const cloudinary = require("../config/cloudinaryConfig");
const ProductData = require("../models/productsModel");

let image_data;
let image_url;

const saveProductData = (req, res) => {
  if (req.body) {
    image_data = req.body;
  }
};

const uploadProductImage = async (req, res) => {
  const { name, price, rating } = image_data;
  const { stars, count } = rating;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  try {
    const up_img = await cloudinary.uploader.upload(req.file.path, {
      public_id: name,
    });
    console.log("image uploaded");
    image_url = up_img.secure_url;
  } catch (error) {
    console.log(error);
  }

  if (name && price && stars && count && image_url) {
    const product = new ProductData({
      name: name,
      price: price,
      rating: {
        stars: stars,
        count: count,
      },
      image: {
        img_name: name,
        source: image_url,
      },
    });
    product.save();
    res.json("uploaded successfully");
  }
};

const fetchProducts = async (req, res) => {
  const products = await ProductData.find();
  products.length > 0 ? res.json(products) : res.json("no products found");
};

module.exports = {
  saveProductData,
  uploadProductImage,
  fetchProducts,
};
