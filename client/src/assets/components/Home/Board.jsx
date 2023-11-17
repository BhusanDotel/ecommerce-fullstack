import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Home/Board.css";

function Board() {
  const navigate = useNavigate();

  const newArrival = () => {
    navigate("/newarrival");
  };
  const Products = () => {
    navigate("/products");
  };
  const Checkout = () => {
    navigate("/checkout");
  };
  const Cart = () => {
    navigate("/cart");
  };
  return (
    <div>
      <div className="board-container">
        <img className="board-image" src="/images/homeImg/board.png" alt="" />
        <div className="board-links-container">
          <div
            onClick={newArrival}
            className="board-nav-link newarrival-link"
          ></div>
          <div
            onClick={Products}
            className="board-nav-link products-link"
          ></div>
          <div
            onClick={Checkout}
            className="board-nav-link checkout-link"
          ></div>
          <div onClick={Cart} className="board-nav-link cart-link"></div>
        </div>
      </div>
    </div>
  );
}

export default Board;
