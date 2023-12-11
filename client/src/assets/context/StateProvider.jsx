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
  const [isAdmin, setAdmin] = React.useState(false);
  const [userAuthToken, setUserAuthToken] = React.useState("");
  const [adminAuthToken, setAdminAuthToken] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

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
    const authToken_user = localStorage.getItem("authToken_user");
    if (authToken_user) {
      setLoggedIn(true);
      setUserAuthToken(authToken_user);
    }
    const authToken_admin = localStorage.getItem("authToken_admin");
    if (authToken_admin) {
      setAdmin(true);
      setAdminAuthToken(authToken_admin);
    }

    const fName = localStorage.getItem("firstName");
    if (fName) {
      setFirstName(fName);
    }
    const lName = localStorage.getItem("lastName");
    if (lName) {
      setLastName(lName);
    }

    const _email = localStorage.getItem("email");
    if (_email) {
      setEmail(_email);
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
        isAdmin,
        setAdmin,
        userAuthToken,
        setUserAuthToken,
        adminAuthToken,
        setAdminAuthToken,
        firstName,
        lastName,
        email,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
