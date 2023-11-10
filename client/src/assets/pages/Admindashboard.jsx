import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../styles/Admin/AdminDashboard.css";

function Admindashboard() {
  return (
    <main className="admin-root">
      <header className="admin-header">
        <NavLink className="admin-link-displayorder" to="displayorders">
          Display Orders
        </NavLink>
        <NavLink className="admin-link-inputproducts" to="inputproducts">
          Add Products
        </NavLink>
      </header>
      <div className="admin-interaction-container">
        <Outlet />
      </div>
    </main>
  );
}

export default Admindashboard;
