import React from "react";
import "../../styles/Home/HomeNav.css";

function HomeNav() {
  const [showMenu, setShowMenu] = React.useState(false);

  function toggleMenu() {
    setShowMenu((prevState) => {
      return !prevState;
    });
  }
  function logOut() {
    localStorage.clear();
    location.reload();
  }
  return (
    <div className="home-nav-header">
      <div className="home-nav-header-left-section">
        <a href="/" className="header-link">
          <img className="home-logo" src="/images/homeImg/logo.png" />
          <img
            className="home-mobile-logo"
            src="/images/homeImg/logo-mobile.png"
          />
        </a>
      </div>

      <div className="home-nav-header-middle-section">
        <a className="header-products-link" href="/products">
          <img
            className="header-middle-product-text"
            src="/images/homeImg/productswood-icon.png"
            alt="products"
          />
        </a>
      </div>

      <div className="home-nav-header-right-section">
        <div className="account" onClick={toggleMenu}>
          <img className="account-icon" src="/images/homeImg/accountwood.png" />
        </div>
        {showMenu && (
          <div style={{ display: "block" }} className="menu-items">
            <ul>
              <li>Profile</li>
              <li onClick={logOut} className="log-out">
                Log Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeNav;
