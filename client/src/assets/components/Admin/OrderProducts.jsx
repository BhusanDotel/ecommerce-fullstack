import React from "react";
import "../../styles/Admin/Orders.css";

function OrderProducts(props) {
  return (
    <div className="order-products">
      <p className="order-date">OrderDate:{props.orderDate}</p>
      <p className="order-product-name">Name:{props.name}</p>
      <p className="order-delivery-date">DeliveryDate:{props.deliveryDate}</p>
      <p className="order-quantity">Quantity:{props.quantity}</p>
      <p className="order-price">Price:{props.price / 100}</p>
      <p className="order-delivery-cost">DeliveryCost:{props.deliveryCost}</p>
      <div className="image-container">
        <img className="order-image" src={props.image} alt={props.name} />
      </div>
    </div>
  );
}

export default OrderProducts;
