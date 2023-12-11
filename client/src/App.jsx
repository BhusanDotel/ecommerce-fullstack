import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import Home from "./assets/pages/Home";
import Products from "./assets/pages/Products";
import Checkout from "./assets/pages/Checkout";
import Admindashboard from "./assets/pages/Admindashboard";
import DisplayOrders from "./assets/components/Admin/DisplayOrders";
import InputProducts from "./assets/components/Admin/InputProducts";
import Product from "./assets/pages/Product";
import NoPageFound from "./assets/pages/NoPageFound";
import EmailVerification from "./assets/pages/EmailVerification";
import { StateContext } from "./assets/context/StateContext";
import "./assets/styles/General.css";

function App() {
  const { isLoggedIn } = React.useContext(StateContext);
  const { isAdmin } = React.useContext(StateContext);
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route index element={isLoggedIn ? <Home /> : <Login />} />
        <Route
          path="checkout"
          element={isLoggedIn ? <Checkout /> : <Login />}
        />
        <Route
          path="newarrival"
          element={isLoggedIn ? <Products /> : <Login />}
        />
        <Route
          path="products"
          element={isLoggedIn ? <Products /> : <Login />}
        />
        <Route
          path="/products/:productid"
          element={isLoggedIn ? <Product /> : <Login />}
        />
        <Route path="emailverification" element={<EmailVerification />} />

        <Route path="cart" element={isLoggedIn ? <Checkout /> : <Login />} />

        <Route
          path="admin-dashboard"
          element={isAdmin ? <Admindashboard /> : <Login />}
        >
          <Route index element={isAdmin ? <DisplayOrders /> : <Login />} />
          <Route
            path="displayorders"
            element={isAdmin ? <DisplayOrders /> : <Login />}
          />
          <Route
            path="inputproducts"
            element={isAdmin ? <InputProducts /> : <Login />}
          />
        </Route>

        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </>
  );
}

export default App;
