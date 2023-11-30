import React from "react";
import axios from "axios";
import OrderProducts from "./OrderProducts";
import { StateContext } from "../../context/StateContext";
import { saveOrderRoute } from "../../Utils/APIRoutes";
import { deleteOrderRoute } from "../../Utils/APIRoutes";
import "../../styles/Admin/Orders.css";

function Orders(props) {
  const { adminAuthToken } = React.useContext(StateContext);
  const [isSaving, setSaving] = React.useState(false);
  const [isDeleting, setDeleting] = React.useState(false);
  const [isButtonDisabled, setButtonDisabled] = React.useState(false);
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

  const orderId = props._id;
  async function Save() {
    const { saveButtonCLick } = props;
    try {
      setSaving(true);
      setButtonDisabled(true);
      await axios
        .post(saveOrderRoute, { adminAuthToken, orderId })
        .then((res) => {
          if (res.data === "order saved") {
            saveButtonCLick();
            setSaving(false);
            setButtonDisabled(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function Delete() {
    const { deleteButtonClick } = props;
    try {
      setDeleting(true);
      setButtonDisabled(true);
      await axios
        .post(deleteOrderRoute, { adminAuthToken, orderId })
        .then((res) => {
          if (res.data === "order deleted") {
            deleteButtonClick(orderId);
            setDeleting(false);
            setButtonDisabled(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
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
          <button
            onClick={Save}
            disabled={isButtonDisabled}
            className="order-save-button"
          >
            {isSaving ? "Saving...." : "Save"}
          </button>
          <button
            onClick={Delete}
            disabled={isButtonDisabled}
            className="order-delete-button"
          >
            {isDeleting ? "Deleting...." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
