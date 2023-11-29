const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.post("/productdata", productController.saveProductData);
router.post(
  "/productimage",
  productController.uploadMiddleware,
  productController.uploadProductImage
);
router.get("/products", productController.fetchProducts);

module.exports = router;
