const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/order", orderController.order);
router.post("/fetchorders", orderController.fetchOrders);
router.post("/save", orderController.saveOrders);
router.post("/delete", orderController.deleteOrders);
module.exports = router;
