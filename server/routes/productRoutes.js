const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/productsController");

const upload = multer({ dest: "uploads/" });

router.post("/productdata", productController.saveProductData);
router.post(
  "/productimage",
  upload.single("image"),
  productController.uploadProductImage
);
router.get("/products", productController.fetchProducts);

module.exports = router;
