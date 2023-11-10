import React from "react";
import { StateContext } from "./StateContext";

export const StateProvider = (props) => {
  const [cartData, setCartData] = React.useState(() => {
    return JSON.parse(localStorage.getItem("cartDataArray")) || [];
  });
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [localStorageUpdate, setlocalStorageUpdate] = React.useState(0);
  const [deliveryCost, setDeliveryCost] = React.useState(0);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const cartDataArray = JSON.parse(localStorage.getItem("cartDataArray"));
    if (cartDataArray) {
      if (cartDataArray.length > 0) {
        let tQ = 0; //total cost
        cartDataArray.forEach((item) => {
          const q = item.quantity;
          tQ += q;
          setTotalQuantity(tQ);
        });
      }

      let tDQ = 0; //total delivery cost
      cartDataArray.forEach((item) => {
        if (item.deliveryOption) {
          const dq = item.deliveryOption.deliveryCost;
          tDQ += dq;
          setDeliveryCost(tDQ);
        }
      });

      if (cartDataArray.length === 0) {
        setTotalQuantity(0);
        setDeliveryCost(0);
      }
    }
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setLoggedIn(true);
    }
  }, [localStorageUpdate]);

  return (
    <StateContext.Provider
      value={{
        cartData,
        setCartData,
        totalQuantity,
        setTotalQuantity,
        localStorageUpdate,
        setlocalStorageUpdate,
        deliveryCost,
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
