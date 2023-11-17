const orderData = require("../models/orderModel");
const deliveryData = require("../models/deliverModel");

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

const saveOrders = async (req, res) => {
  if (req.body) {
    try {
      const orderId = req.body.orderId;
      const orderProduct = await orderData.find({ _id: orderId });
      if (orderProduct) {
        const _deliveryData = [];
        _deliveryData.push(orderProduct);
        if (_deliveryData.length !== 0) {
          const deliverydata = new deliveryData({
            deliverData: _deliveryData,
          });
          await deliverydata.save();
          res.json("order saved");
          const deleteCartData = await orderData.findOneAndDelete(orderId);
        }
      }
    } catch (error) {
      res.json("not saved");
    }
  }
};

const deleteOrders = async (req, res) => {
  if (req.body) {
    const orderId = req.body.orderId;
    console.log(orderId);
    try {
      const deleteCartData = await orderData.findOneAndDelete(orderId);
      if (deleteCartData) {
        res.json("order deleted");
      } else {
        res.json("not deleted");
      }
    } catch (error) {}
  }
};

module.exports = {
  order,
  fetchOrders,
  saveOrders,
  deleteOrders,
};
