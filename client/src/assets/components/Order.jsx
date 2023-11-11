import React from "react";
import { StateContext } from "../context/StateContext";
import { getDate } from "../service/Date";

import "../styles/Chcekout/Order.css";

function Order(props) {
  const { cartData, setCartData, setlocalStorageUpdate, localStorageUpdate } =
    React.useContext(StateContext);

  const [deliveryOption, setDeliveryOption] = React.useState({
    deliveryCost: 0,
    deliveryDate: getDate().seventhDate,
  });
  const [isUpdateInput, setUpdateInput] = React.useState(false);
  const [isCancelUpdate, setCancelUpdate] = React.useState(true);
  const [newQuantity, setNewQuantity] = React.useState("");
  const [deliveryCost, setDeliveryCost] = React.useState(0);

  function toggleShowUpdate() {
    setUpdateInput((prevState) => {
      return !prevState;
    });
  }

  function handleNewQuantity(event) {
    const _newQuantity = parseInt(event.target.value);
    if (event.target.value === "") {
      setCancelUpdate(true);
      setNewQuantity(_newQuantity);
    } else {
      setCancelUpdate(false);
      setNewQuantity(_newQuantity);
    }
  }

  function updateQuantity() {
    const _cartData = [...cartData];
    _cartData[props.cartItemPosition].quantity = newQuantity;
    setCartData(_cartData);
    localStorage.setItem("cartDataArray", JSON.stringify(_cartData));
    setlocalStorageUpdate((prevState) => {
      return prevState + 1;
    });
    setCancelUpdate(true);
  }

  function cancelUpdate() {
    setUpdateInput(true);
  }

  function deleteItem() {
    const _cartData = [...cartData];
    _cartData.splice(props.cartItemPosition, 1);
    setCartData(_cartData);
    localStorage.setItem("cartDataArray", JSON.stringify(_cartData));
    setlocalStorageUpdate((prevState) => {
      return prevState + 1;
    });
  }

  let _deliveryOption = {};
  function handleChange(event) {
    const _cartData = [...cartData];
    _deliveryOption = { ...deliveryOption };
    if (parseInt(event.target.value) === 0) {
      _deliveryOption.deliveryCost = 0;
      _deliveryOption.deliveryDate = getDate().seventhDate;
    } else if (parseInt(event.target.value) === 200) {
      _deliveryOption.deliveryCost = 200;
      _deliveryOption.deliveryDate = getDate().fifthDate;
    } else {
      _deliveryOption.deliveryCost = 500;
      _deliveryOption.deliveryDate = getDate().secondDate;
    }
    setDeliveryOption(_deliveryOption);
    _cartData[props.cartItemPosition].deliveryOption = _deliveryOption;
    localStorage.setItem("cartDataArray", JSON.stringify(_cartData));
    setlocalStorageUpdate((prevState) => {
      return prevState + 1;
    });
  }

  React.useEffect(() => {
    const currentItem = cartData[props.cartItemPosition];
    if (currentItem.deliveryOption) {
      const _deliveryCost = currentItem.deliveryOption.deliveryCost;
      setDeliveryCost(_deliveryCost);
    }
  }, [localStorageUpdate]);

  return (
    <>
      <div className="cart-item-container">
        <div className="delivery-date js-upper-date">
          Delivery date: {deliveryOption.deliveryDate}
        </div>

        <div className="cart-item-details-grid">
          <img className="product-image" src={props.image} />

          <div className="cart-item-details">
            <div className="product-name">{props.name}</div>
            <div className="product-price">Rs {props.price / 100}</div>

            <div className="product-quantity js-product-quantity">
              <span>
                Quantity:{" "}
                {!isUpdateInput ? (
                  <span className="quantity-label">{props.quantity}</span>
                ) : (
                  <input
                    onChange={handleNewQuantity}
                    name="newQuantity"
                    className="update-product-input"
                    value={newQuantity}
                    type="number"
                  ></input>
                )}
              </span>
              <span
                className="update-quantity-link link-primary"
                onClick={toggleShowUpdate}
              >
                {isUpdateInput ? (
                  <span>
                    {!isCancelUpdate ? (
                      <span onClick={updateQuantity}>Save</span>
                    ) : (
                      <span onClick={cancelUpdate}>Cancel</span>
                    )}
                  </span>
                ) : (
                  "Update"
                )}
              </span>
              <span
                className="delete-quantity-link link-primary "
                onClick={deleteItem}
              >
                Delete
              </span>
            </div>
          </div>

          <div className="delivery-options">
            <div className="delivery-options-title">
              Choose a delivery option:
            </div>
            <div className="delivery-option">
              <input
                type="radio"
                className="delivery-option-input"
                name={`deliveryOption${props.cartItemPosition}`}
                value="0"
                checked={deliveryCost === 0}
                onChange={handleChange}
              />
              <div>
                <div className="delivery-option-date">
                  {getDate().seventhDate}
                </div>
                <div className="delivery-option-price">FREE Delivery</div>
              </div>
            </div>
            <div className="delivery-option">
              <input
                type="radio"
                className="delivery-option-input"
                name={`deliveryOption${props.cartItemPosition}`}
                checked={deliveryCost === 200}
                value="200"
                onChange={handleChange}
              />
              <div>
                <div className="delivery-option-date">
                  {getDate().fifthDate}
                </div>
                <div className="delivery-option-price">Rs 200 - Delivery</div>
              </div>
            </div>
            <div className="delivery-option">
              <input
                type="radio"
                className="delivery-option-input"
                name={`deliveryOption${props.cartItemPosition}`}
                checked={deliveryCost === 500}
                value="500"
                onChange={handleChange}
              />
              <div>
                <div className="delivery-option-date">
                  {getDate().secondDate}
                </div>
                <div className="delivery-option-price">Rs 500 - Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
