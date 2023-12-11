const orderData = require("../models/orderModel");
const deliveryData = require("../models/deliverModel");
const UserData = require("../models/userModel");
const ProductData = require("../models/productsModel");

const order = async (req, res) => {
  if (req.body) {
    const { cartData, customerInfo, userAuthToken } = req.body;
    if (cartData && customerInfo && userAuthToken) {
      try {
        const isUser = await UserData.findOne({ userToken: userAuthToken });
        if (isUser) {
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
        }
      } catch (error) {
        res.json("order entry fail");
      }
    }
  }
};

const fetchOrders = async (req, res) => {
  if (req.body) {
    try {
      const { adminAuthToken } = req.body;
      if (adminAuthToken) {
        const isAdmin = await UserData.findOne({ adminToken: adminAuthToken });
        if (isAdmin) {
          const orderedProducts = await orderData.find();
          orderedProducts.length !== 0
            ? res.json(orderedProducts)
            : res.json("No orders");
        }
      }
    } catch (error) {
      res, json(error);
    }
  }
};

const saveOrders = async (req, res) => {
  if (req.body) {
    try {
      const { orderId, adminAuthToken } = req.body;
      if (orderId && adminAuthToken) {
        const isAdmin = await UserData.findOne({
          adminToken: adminAuthToken,
        });
        if (isAdmin) {
          const orderProduct = await orderData.find({ _id: orderId });
          if (orderProduct) {
            const trueCustomerEmail = orderProduct[0].cartData[1].email;
            if (trueCustomerEmail) {
              console.log(trueCustomerEmail);
              const orderedProductsIDs = orderProduct[0].cartData[0];
              orderedProductsIDs.forEach(async (item) => {
                const orderedproducts = await ProductData.findOne({
                  _id: item._id,
                });
                if (
                  !orderedproducts.trueCustomers.includes(trueCustomerEmail)
                ) {
                  orderedproducts.trueCustomers.push(trueCustomerEmail);
                }
                orderedproducts.markModified("trueCustomers");
                await orderedproducts.save();
              });
            }
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
        }
      }
    } catch (error) {
      res.json("not saved");
    }
  }
};

const deleteOrders = async (req, res) => {
  if (req.body) {
    try {
      const { orderId, adminAuthToken } = req.body;
      if (orderId && adminAuthToken) {
        const isAdmin = await UserData.findOne({
          adminToken: adminAuthToken,
        });
        if (isAdmin) {
          const deleteCartData = await orderData.findOneAndDelete(orderId);
          if (deleteCartData) {
            res.json("order deleted");
          } else {
            res.json("not deleted");
          }
        }
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
