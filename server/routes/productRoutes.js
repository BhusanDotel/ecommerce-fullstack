const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.post("/productdata", productController.saveProductData);
router.post(
  "/productimage",
  productController.uploadMiddleware,
  productController.uploadProductImage
);
router.post("/products", productController.fetchProducts);
router.post("/singleProduct", productController.fetchSingleProduct);

module.exports = router;
