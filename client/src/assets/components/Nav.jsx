import React from "react";
import { StateContext } from "../context/StateContext";
import SearchWindow from "./SearchWindow";

import "../styles/Nav.css";

function Nav() {
  const [showMenu, setShowMenu] = React.useState(false);
  const [isSearchWindow, setSearchwindow] = React.useState(false);
  const { totalQuantity } = React.useContext(StateContext);
  const [searchKeyWord, setSearchKeyWord] = React.useState("");

  function toggleMenu() {
    setShowMenu((prevState) => {
      return !prevState;
    });
  }
  function logOut() {
    localStorage.clear();
    location.reload();
  }
  const handlechange = (e) => {
    if (e.target.value) {
      setSearchwindow(true);
      setSearchKeyWord(e.target.value);
    } else {
      setSearchwindow(false);
    }
  };

  return (
    <div className="home-header">
      <div className="home-header-left-section">
        <a href="/" className="header-link">
          <img className="home-logo" src="/images/logo.png" />
          <img className="home-mobile-logo" src="/images/logo-mobile.png" />
        </a>
      </div>

      <div className="home-header-middle-section">
        <input
          onChange={handlechange}
          className="search-bar"
          type="text"
          placeholder="Search"
        />

        <button className="search-button">
          <img className="search-icon" src="/images/icons/search-icon.png" />
        </button>

        {isSearchWindow && (
          <div className="search-window-root-container">
            <SearchWindow key={searchKeyWord} searchKeyWord={searchKeyWord} />
          </div>
        )}
      </div>

      <div className="home-header-right-section">
        <a className="cart-link header-link js-cart-link" href="/checkout">
          <img className="cart-icon" src="/images/icons/cart-icon.png" />
          <div className="cart-quantity js-cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </a>
        <div className="account" onClick={toggleMenu}>
          <img className="account-icon" src="/images/account.png" />
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

export default Nav;
