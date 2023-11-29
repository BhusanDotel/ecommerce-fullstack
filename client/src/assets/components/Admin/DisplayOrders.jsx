import React from "react";
import axios from "axios";
import Orders from "./Orders";
import "../../styles/Admin/DisplayOrders.css";

function DisplayOrders() {
  const [orderProduct, setOrderProduct] = React.useState("no orders");
  const [orderCount, setOrderCount] = React.useState(0);
  const [isProductsMissing, setProductsMissing] = React.useState(false);

  React.useEffect(() => {
    async function fetchOrders() {
      const response = await axios.get("http://localhost:3000/api/fetchorders");
      const data = response.data;
      if (response.data !== "No orders") {
        const count = data.length;
        setOrderCount(count);
        setOrderProduct(data);
      } else setProductsMissing(true);
    }
    fetchOrders();
  }, []);

  let renderArray = [];
  if (orderProduct !== "no orders") {
    renderArray = orderProduct.map((product, index) => {
      return (
        <Orders
          key={index}
          _id={product._id}
          products={product.cartData[0]} //contains order products
          customer={product.cartData[1]} //contains customer details
        />
      );
    });
  }

  return (
    <>
      <h1 className="ordered-products-title">Ordered Products</h1>
      <div className="admin-orders-container">{renderArray}</div>
      {isProductsMissing && <p>No Orders, Sad!</p>}
    </>
  );
}

export default DisplayOrders;
