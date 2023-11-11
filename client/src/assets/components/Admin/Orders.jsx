import React from "react";
import OrderProducts from "./OrderProducts";
import "../../styles/Admin/Orders.css";

function Orders(props) {
  const [totalCost, setTotalCost] = React.useState(0);
  const [totalDeliveryCost, setTotalDeliveryCost] = React.useState(0);
  const [taxAmount, setTaxAmount] = React.useState(0);
  const products = props.products;
  const renderArray = products.map((item, index) => {
    return (
      <OrderProducts
        key={index}
        deliveryDate={item.deliveryOption.deliveryDate}
        deliveryCost={item.deliveryOption.deliveryCost}
        orderDate={item.orderDate}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        image={item.image}
      />
    );
  });

  React.useEffect(() => {
    let TC = 0;
    let TDC = 0;
    products.forEach((item) => {
      const tc = item.price;
      const t = item.quantity;
      const tdc = item.deliveryOption.deliveryCost;
      const _TC = tc * t;
      TC += _TC;
      TDC += tdc;
      setTotalCost(TC / 100);
      setTotalDeliveryCost(TDC);
      const taxamount = (TC / 100 + TDC) * (10 / 100);
      setTaxAmount(taxamount);
    }, []);
  }, []);

  function Save() {
    console.log("save Item with ID:" + props._id);
  }

  function Delete() {
    console.log("Delete Item with ID:" + props._id);
  }

  return (
    <div className="order-product-customer-container">
      <div className="order-product-container">{renderArray}</div>
      <div className="customer-price-container">
        <div className="customer-container">
          <p className="customer-info-title">Customer Info:</p>
          <p className="customer-name">
            Name: {props.customer.fname} {props.customer.lname}
          </p>
          <p className="customer-phone">Phone: {props.customer.pNumber}</p>
          <p className="customer-address"> Address:{props.customer.address}</p>
        </div>
        <div className="product-price-container">
          <p className="product-price-total">Total: {totalCost}</p>
          <p className="product-price-deliverycost">
            Delivery Cost: {totalDeliveryCost}
          </p>
          <p className="product-price-taxamount">
            Tax Amount (10%): {taxAmount}
          </p>
          <p className="product-price-grandtotal">
            Grand Total: {totalCost + totalDeliveryCost + taxAmount}{" "}
          </p>
        </div>
        <div className="order-buttons-div">
          <button onClick={Save} className="order-save-button">
            Save
          </button>
          <button onClick={Delete} className="order-delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
