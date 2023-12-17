import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContext } from "../context/StateContext";
import "../styles/Chcekout/PaymentSummar.css";
import { orderRoute } from "../Utils/APIRoutes";
import { host } from "../Utils/APIRoutes";
import LoadingSVG from "./LoadingSVG";
import io from "socket.io-client";

const socket = io.connect(host);
function PaymentSummary() {
  const {
    cartData,
    setCartData,
    totalQuantity,
    localStorageUpdate,
    setTotalQuantity,
    deliveryCost,
    userAuthToken,
    firstName,
    lastName,
    email,
  } = React.useContext(StateContext);

  const [prices, setPrices] = React.useState({
    totalPrice: 0,
    deliveryHanlde: 0,
    totalBeforeTax: 0,
    taxAmout: 0,
    grandTotal: 0,
  });
  const [customerInfo, setCustomerInfo] = React.useState({
    fname: firstName,
    lname: lastName,
    email: email,
    pNumber: "",
    address: "",
  });
  const [isFieldEmpty, setFieldEmpty] = React.useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };
  const [isLoading, setLoading] = React.useState(false);
  const [isButtonDisabled, setButtonDisabled] = React.useState(false);

  function handleChange(e) {
    const _customerInfo = { ...customerInfo };
    _customerInfo[e.target.name] = e.target.value;
    setCustomerInfo(_customerInfo);
  }

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      placeOrder();
    }
  };

  async function placeOrder() {
    let doSend = false;
    if (cartData.length > 0) {
      cartData.forEach((product) => {
        if (product.availableQuantity >= product.quantity) {
          doSend = true;
        }
      });
    }
    if (
      customerInfo.fname !== "" &&
      customerInfo.lname !== "" &&
      customerInfo.pNumber !== "" &&
      customerInfo.address !== "" &&
      email
    ) {
      if (cartData.length > 0) {
        setLoading(true);
        setButtonDisabled(true);
        if (doSend) {
          try {
            await axios
              .post(orderRoute, {
                cartData,
                customerInfo,
                userAuthToken,
              })
              .then((res) => {
                if (res.data === "order entry success") {
                  toast.success("Order is successful", toastOptions);
                  setCartData([]);
                  localStorage.removeItem("cartDataArray");
                  setTotalQuantity(0);
                  setCustomerInfo({
                    fname: "",
                    lname: "",
                    pNumber: "",
                    address: "",
                  });
                  setPrices({
                    totalPrice: 0,
                    deliveryHanlde: 0,
                    totalBeforeTax: 0,
                    taxAmout: 0,
                    grandTotal: 0,
                  });
                  setLoading(false);
                  setButtonDisabled(false);
                } else {
                  toast.error(res.data, toastOptions);
                  setLoading(false);
                }
              });
            await socket.emit("place_order", cartData);
          } catch (error) {}
        } else {
          toast.error(
            "Not enough quantity available in stock! Select each products quantity from dropdown menu",
            toastOptions
          );
          setLoading(false);
          setButtonDisabled(false);
        }
      }
    } else {
      setFieldEmpty(true);
      setTimeout(() => {
        setFieldEmpty(false);
      }, 3000);
    }
  }

  React.useEffect(() => {
    if (cartData) {
      let total_Price = 0;
      let total_delivery_cost = 0;
      cartData.forEach((item) => {
        const price = item.price * item.quantity;
        const deliverycost = item.deliveryOption.deliveryCost;
        total_Price += price;
        total_delivery_cost += deliverycost;
      });
      const deliveryHanlde = total_delivery_cost * 100;
      const totalBeforeTax = total_Price + deliveryHanlde;
      const taxAmout = (10 / 100) * totalBeforeTax;
      const grandTotal = totalBeforeTax + taxAmout;

      const _prices = { ...prices };
      _prices.totalPrice = total_Price / 100;
      _prices.deliveryHanlde = deliveryHanlde;
      _prices.totalBeforeTax = totalBeforeTax / 100;
      const taxAmout_raw = taxAmout / 100;
      const taxAmout_round = taxAmout_raw.toFixed(2);
      _prices.taxAmout = parseFloat(taxAmout_round).toFixed(2);
      const grandTotal_raw = grandTotal / 100;
      const grandTotal_round = grandTotal_raw.toFixed(2);
      _prices.grandTotal = parseFloat(grandTotal_round).toFixed(2);

      setPrices(_prices);
    }
  }, [localStorageUpdate]);

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div className="js-cart-quantity">Items ({totalQuantity}):</div>
        <div className="payment-summary-money js-total-cost">
          Rs {prices.totalPrice}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Delivery & handling:</div>
        <div className="payment-summary-money js-shipping-cost">
          Rs {deliveryCost}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money js-total-beforetax">
          Rs {prices.totalBeforeTax}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money js-estimated-tax">
          Rs {prices.taxAmout}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money js-order-total">
          Rs {prices.grandTotal}
        </div>
      </div>

      <div className="user-info-input">
        <h3 className="enter-details-heading">Enter you details</h3>
        <div className="user-detail-warning-message-container">
          {isFieldEmpty && (
            <p className="user-detail-warning-message">
              Do not leave fields empty!!
            </p>
          )}
        </div>
        <div className="name-input-div">
          <input
            className="checkout-fname"
            name="fname"
            value={customerInfo.fname}
            type="text"
            placeholder="FirstName*"
            onChange={handleChange}
            onKeyDown={handleKeyPressed}
          />
          <input
            className="checkout-lname"
            name="lname"
            value={customerInfo.lname}
            type="text"
            placeholder="LastName*"
            onChange={handleChange}
            onKeyDown={handleKeyPressed}
          />
        </div>
        <input
          type="text"
          name="pNumber"
          value={customerInfo.pNumber}
          className="checkout-phone"
          placeholder="PhoneNumber*"
          onChange={handleChange}
          onKeyDown={handleKeyPressed}
        ></input>
        <input
          type="text"
          name="address"
          value={customerInfo.address}
          className="checkout-address"
          placeholder="Address: district-City/tole/landmark*"
          onChange={handleChange}
          onKeyDown={handleKeyPressed}
        ></input>
      </div>

      <button
        onClick={placeOrder}
        disabled={isButtonDisabled}
        className="place-order-button"
      >
        {isLoading ? <LoadingSVG /> : "Place Order"}
      </button>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default PaymentSummary;
