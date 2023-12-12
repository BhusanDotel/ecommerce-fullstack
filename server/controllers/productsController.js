const ProductData = require("../models/productsModel");
const UserData = require("../models/userModel");
const multer = require("multer");
require("dotenv").config();
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "kindimnata",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

let image_data;
let image_url;

const saveProductData = (req, res) => {
  if (req.body) {
    image_data = req.body;
  }
};

const upload = multer({ dest: "uploads/" });
const uploadMiddleware = upload.single("image");

const uploadProductImage = async (req, res) => {
  const { name, price, quantity, description, adminAuthToken } = image_data;
  if (name && price && adminAuthToken) {
    const isAdmin = await UserData.findOne({ adminToken: adminAuthToken });
    if (isAdmin) {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }
      try {
        const up_img = await cloudinary.uploader.upload(req.file.path, {
          public_id: name,
        });
        image_url = up_img.secure_url;

        if (image_url) {
          fs.unlinkSync(req.file.path);
        }
      } catch (error) {
        console.log(error);
      }

      if (name && price && quantity && description && image_url) {
        const product = new ProductData({
          name: name,
          price: price * 100,
          rating: {
            raters: [],
            totalStars: 0,
            stars: 0,
            count: 0,
          },
          quantity: quantity,
          description: description,
          review: [],
          trueCustomers: [],
          image: {
            img_name: name,
            source: image_url,
          },
        });
        product.save();
        res.json("uploaded successfully");
      }
    }
  }
};

const fetchProducts = async (req, res) => {
  if (req.body) {
    const { userAuthToken } = req.body;
    if (userAuthToken) {
      const isUser = await UserData.findOne({ userToken: userAuthToken });
      if (isUser) {
        const products = await ProductData.find();
        products.length > 0
          ? res.json(products)
          : res.json("no products found");
      } else {
        res.json("unauthorize excess");
      }
    }
  }
};

const fetchSingleProduct = async (req, res) => {
  if (req.body) {
    const { productid, userAuthToken } = req.body;
    if (productid && userAuthToken) {
      const isUser = await UserData.findOne({ userToken: userAuthToken });
      if (isUser) {
        const product = await ProductData.findOne({ _id: productid });
        if (product) {
          res.json(product);
        }
      } else {
        res.json("unauthorize excess");
      }
    }
  }
};

module.exports = {
  saveProductData,
  uploadProductImage,
  uploadMiddleware,
  fetchProducts,
  fetchSingleProduct,
};
