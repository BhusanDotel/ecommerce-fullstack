const orderData = require("../models/orderModel");
const deliveryData = require("../models/deliverModel");
const UserData = require("../models/userModel");
const ProductData = require("../models/productsModel");

const order = async (req, res) => {
  if (req.body) {
    const { cartData, customerInfo, userAuthToken } = req.body;
    if (cartData && customerInfo && userAuthToken) {
      let cartProductQuantities = [];
      await Promise.all(
        cartData.map(async (items) => {
          const productId = items._id;
          const productExists = await ProductData.findOne({ _id: productId });

          if (productExists) {
            cartProductQuantities.push(productExists.quantity); //this array contains orderquantities
          }
        })
      );
      if (!cartProductQuantities.includes(0)) {
        //if any element in array is 0, means that product is out of stock
        let cartDataProductQuantityList = [];
        cartData.forEach((prodectObject) => {
          const cartDataProductQuantityObj = {
            Id: prodectObject._id,
            quantity: prodectObject.quantity,
          };
          cartDataProductQuantityList.push(cartDataProductQuantityObj);
        });
        for (let i = 0; i < cartDataProductQuantityList.length; i++) {
          const productExists = await ProductData.findOne({
            _id: cartDataProductQuantityList[i].Id,
          });
          if (
            productExists.quantity >= cartDataProductQuantityList[i].quantity
          ) {
            productExists.quantity =
              productExists.quantity - cartDataProductQuantityList[i].quantity;
            productExists.markModified("quantity");
            await productExists.save();
            try {
              const isUser = await UserData.findOne({
                userToken: userAuthToken,
              });
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
      } else {
        res.json("Product out of stock");
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
          const orderedProductList = deleteCartData.cartData[0];
          for (let i = 0; i < orderedProductList.length; i++) {
            const productExists = await ProductData.findOne({
              _id: orderedProductList[i]._id,
            });
            productExists.quantity =
              productExists.quantity + orderedProductList[i].quantity;
            productExists.markModified("quantity");
            await productExists.save();
          }
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
