import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContext } from "../context/StateContext";
import "../styles/Chcekout/PaymentSummar.css";

function PaymentSummary() {
  const {
    cartData,
    totalQuantity,
    localStorageUpdate,
    setlocalStorageUpdate,
    deliveryCost,
  } = React.useContext(StateContext);
  const [prices, setPrices] = React.useState({
    totalPrice: 0,
    deliveryHanlde: 0,
    totalBeforeTax: 0,
    taxAmout: 0,
    grandTotal: 0,
  });
  const [customerInfo, setCustomerInfo] = React.useState({
    fname: "",
    lname: "",
    pNumber: "",
    address: "",
  });
  const [isFieldEmpty, setFieldEmpty] = React.useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  function handleChange(e) {
    const _customerInfo = { ...customerInfo };
    _customerInfo[e.target.name] = e.target.value;
    setCustomerInfo(_customerInfo);
  }

  function placeOrder() {
    if (
      customerInfo.fname !== "" &&
      customerInfo.lname !== "" &&
      customerInfo.pNumber !== "" &&
      customerInfo.address !== ""
    ) {
      localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
      setlocalStorageUpdate((prevState) => {
        return prevState + 1;
      });
      toast.success("Order is successful", toastOptions);
      setCustomerInfo({
        fname: "",
        lname: "",
        pNumber: "",
        address: "",
      });
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
      cartData.forEach((item) => {
        const price = item.priceCents * item.quantity;
        total_Price += price;
      });
      const deliveryHanlde = prices.deliveryHanlde;
      const totalBeforeTax = total_Price + deliveryHanlde;
      const taxAmout = (10 / 100) * totalBeforeTax;
      const grandTotal = totalBeforeTax + taxAmout;

      const _prices = { prices };
      _prices.totalPrice = total_Price / 100;
      _prices.deliveryHanlde = deliveryCost / 100;
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
          />
          <input
            className="checkout-lname"
            name="lname"
            value={customerInfo.lname}
            type="text"
            placeholder="LastName*"
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="pNumber"
          value={customerInfo.pNumber}
          className="checkout-phone"
          placeholder="PhoneNumber*"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="address"
          value={customerInfo.address}
          className="checkout-address"
          placeholder="Address*"
          onChange={handleChange}
        ></input>
      </div>

      <button
        onClick={placeOrder}
        className="place-order-button button-primary"
      >
        Place your order
      </button>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default PaymentSummary;
