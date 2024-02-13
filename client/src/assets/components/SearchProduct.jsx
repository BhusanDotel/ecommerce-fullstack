import React from "react";
import "../styles/SearchProduct.css";
import { useNavigate } from "react-router-dom";

function SearchProduct(props) {
  const navigate = useNavigate();
  const Product = () => {
    navigate(`/products/${props.id}`);
    location.reload();
  };
  return (
    <>
      <div onClick={Product} className="searchproduct-row">
        <div className="searchproduct-image-div">
          <img
            className="searchproduct-img"
            src={props.image.source}
            alt={props.name}
          />
        </div>
        <p className="searchproduct-name">{props.name}</p>
      </div>
    </>
  );
}

export default SearchProduct;
