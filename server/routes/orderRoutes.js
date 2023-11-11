const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/order", orderController.order);
router.get("/fetchorders", orderController.fetchOrders);
module.exports = router;
