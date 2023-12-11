import React from "react";
import { useNavigate } from "react-router-dom";
import { getDate } from "../service/Date";
import "../styles/Products/Product.css";

function Product(props) {
  const [isAdded, setAdded] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const navigate = useNavigate();

  let timeoutId;
  function showAddedMsg() {
    setAdded(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  function handleQuantity(e) {
    const _quantity = e.target.value;
    const _quantityInt = parseInt(_quantity);
    setQuantity(_quantityInt);
  }

  function timeAndDate() {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1; // Months are 0-based, so add 1.
    const day = currentDateTime.getDate();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedDateTime = `${year}-${month}-${day} ${formattedHours}:${minutes} ${amOrPm}`;
    return formattedDateTime;
  }

  function addToCart() {
    showAddedMsg();
    const cartData = {
      _id: props.id,
      deliveryOption: { deliveryCost: 0, deliveryDate: getDate().seventhDate },
      name: props.name,
      price: props.price,
      orderDate: timeAndDate(),
      quantity: quantity,
      image: props.image.source,
    };
    //to send cartData
    props.getCartData(cartData);
  }

  const Product = () => {
    navigate(`/products/${props.id}`);
  };

  return (
    <div>
      <div className="product-container">
        <div onClick={Product} className="product-image-container">
          <img className="product-image" src={props.image.source} />
        </div>

        <div className="product-name limit-text-to-2-lines">{props.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`/images/ratings/rating-${props.rating.stars * 10}.png`}
          />
          <div className="product-rating-count link-primary">
            {props.rating.count}
          </div>
        </div>

        <div className="product-price">{`Rs ${props.price / 100}`}</div>

        <div className="product-quantity-container">
          <select name="quantity" onChange={handleQuantity} value={quantity}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div
          className={`added-to-cart ${isAdded ? "added-to-cart-display" : ""}`}
        >
          {isAdded && (
            <img
              className="added-to-cart-img"
              src="/images/icons/checkmark.png"
            />
          )}
          Added
        </div>

        <button
          onClick={addToCart}
          className="add-to-cart-button button-primary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
