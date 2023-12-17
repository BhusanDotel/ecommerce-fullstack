import React, { useContext } from "react";
import axios from "axios";
import Orders from "./Orders";
import { StateContext } from "../../context/StateContext";
import { fetchOrderRoute } from "../../Utils/APIRoutes";
import LoadingScreen from "../LoadingScreen";
import { host } from "../../Utils/APIRoutes";
import io from "socket.io-client";
import "../../styles/Admin/DisplayOrders.css";

const socket = io.connect(host);

function DisplayOrders() {
  const { adminAuthToken } = useContext(StateContext);
  const [orderProduct, setOrderProduct] = React.useState([]);
  const [orderCount, setOrderCount] = React.useState(0);
  const [trigger, setTrigger] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      const response = await axios.post(fetchOrderRoute, { adminAuthToken });
      if (response) {
        setLoading(false);
        const data = response.data;
        if (response.data !== "No orders") {
          const count = data.length;
          setOrderCount(count);
          setOrderProduct(data);
        } else {
          setOrderCount(0);
          setOrderProduct([]);
        }
      }
    }
    fetchOrders();
  }, [trigger]);

  React.useEffect(() => {
    socket.on("receive_order", (data) => {
      if (data) {
        setTrigger((prevCount) => {
          return prevCount + 1;
        });
      }
    });
  }, [socket]);

  const Save = () => {
    setTrigger((prevCount) => {
      return prevCount + 1;
    });
  };
  const Delete = () => {
    setTrigger((prevCount) => {
      return prevCount + 1;
    });
  };

  let renderArray = [];
  if (orderProduct !== "no orders") {
    renderArray = orderProduct.map((product, index) => {
      return (
        <Orders
          key={index}
          _id={product._id}
          products={product.cartData[0]} //contains order products
          customer={product.cartData[1]} //contains customer details
          saveButtonCLick={Save}
          deleteButtonClick={Delete}
        />
      );
    });
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <h1 className="ordered-products-title">Ordered Products</h1>
          <div className="admin-orders-container">{renderArray}</div>
          {orderProduct.length === 0 && <p>No Orders, Sad!</p>}
        </>
      )}
    </>
  );
}

export default DisplayOrders;
