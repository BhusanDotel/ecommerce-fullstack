const orderData = require("../models/orderModel");

const order = async (req, res) => {
  if (req.body) {
    try {
      const { cartData, customerInfo } = req.body;
      let cart = [];
      cart.push(cartData);
      cart.push(customerInfo);
      if (cart.length !== 0) {
        const orderdata = new orderData({
          cartData: cart,
        });
        await orderdata.save();
        res.json("order entry success");
      }
    } catch (error) {
      res.json("order entry fail");
    }
  }
};

const fetchOrders = async (req, res) => {
  const orderedProducts = await orderData.find();
  orderedProducts.length !== 0
    ? res.json(orderedProducts)
    : res.json("No orders");
};

module.exports = {
  order,
  fetchOrders,
};
