import React from "react";
import Order from "../components/Order";
import PaymentSummary from "../components/PaymentSummary";
import { StateContext } from "../context/StateContext";
import "../styles/Chcekout/Checkout.css";

function Checkout() {
  const { cartData, totalQuantity } = React.useContext(StateContext);
  let cartProduct = [];
  if (cartData) {
    cartProduct = cartData.map((product, index) => {
      return (
        <Order
          key={index}
          cartItemPosition={index}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          quantity={product.quantity}
        />
      );
    });
  }
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="checkout-home-logo" src="images/logo-dark.png" />
              <img
                className="home-mobile-logo"
                src="images/logo-mobile-dark.png"
              />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              {`${totalQuantity} items`}
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="chcekout-main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary js-order-summary">
            {cartData.length > 0 ? cartProduct : "No Products"}
          </div>
          <div className="payment-summary">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
