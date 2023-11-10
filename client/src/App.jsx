import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import Home from "./assets/pages/Home";
import Checkout from "./assets/pages/Checkout";
import Admindashboard from "./assets/pages/Admindashboard";
import DisplayOrders from "./assets/components/Admin/DisplayOrders";
import InputProducts from "./assets/components/Admin/InputProducts";
import NoPageFound from "./assets/pages/NoPageFound";
import { StateProvider } from "./assets/context/StateProvider";
import "./assets/styles/General.css";

function App() {
  return (
    <>
      <StateProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Home />} />
          <Route path="checkout" element={<Checkout />} />

          <Route path="admin-dashboard" element={<Admindashboard />}>
            <Route index element={<DisplayOrders />} />
            <Route path="displayorders" element={<DisplayOrders />} />
            <Route path="inputproducts" element={<InputProducts />} />
          </Route>

          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </StateProvider>
    </>
  );
}

export default App;
