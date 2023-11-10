import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../styles/Admin/AdminDashboard.css";

function Admindashboard() {
  const navigate = useNavigate();

  function toHome() {
    navigate("/");
  }
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <main className="admin-root">
      <header className="admin-header">
        <div className="admin-nav-left-section">
          <NavLink className="admin-link-displayorder" to="displayorders">
            Display Orders
          </NavLink>
          <NavLink className="admin-link-inputproducts" to="inputproducts">
            Add Products
          </NavLink>
        </div>
        <div className="admin-nav-right-section">
          <p className="admin-link-home" onClick={toHome}>
            Visit as User
          </p>
          <button onClick={logout} className="admin-link-logout">
            Logout
          </button>
        </div>
      </header>
      <div className="admin-interaction-container">
        <Outlet />
      </div>
    </main>
  );
}

export default Admindashboard;
