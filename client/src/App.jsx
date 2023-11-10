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
import { StateContext } from "./assets/context/StateContext";
import "./assets/styles/General.css";

function App() {
  const { isLoggedIn } = React.useContext(StateContext);
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
          path="admin-dashboard"
          element={isLoggedIn ? <Admindashboard /> : <Login />}
        >
          <Route index element={isLoggedIn ? <DisplayOrders /> : <Login />} />
          <Route
            path="displayorders"
            element={isLoggedIn ? <DisplayOrders /> : <Login />}
          />
          <Route
            path="inputproducts"
            element={isLoggedIn ? <InputProducts /> : <Login />}
          />
        </Route>

        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </>
  );
}

export default App;
