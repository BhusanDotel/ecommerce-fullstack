import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Product from "../components/Product";
// import ProductArray from "../data/Products";
import { StateContext } from "../context/StateContext";
import "../styles/Home/Home.css";
import { fetchProductRoute } from "../Utils/APIRoutes";

function Home() {
  const { cartData, setlocalStorageUpdate, setCartData } =
    React.useContext(StateContext);
  const [ProductData, setProductData] = React.useState([]);
  const renderProductsArray = ProductData.map((product, index) => {
    return (
      <Product
        key={index}
        id={product._id}
        image={product.image}
        name={product.name}
        rating={product.rating}
        price={product.price}
        getCartData={recieveData}
      />
    );
  });

  React.useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get(fetchProductRoute);
      const data = response.data;
      setProductData(data);
    }
    fetchProducts();
  }, []);

  function recieveData(cartDataProducts) {
    const _cartData = [...cartData];
    _cartData.push(cartDataProducts);
    localStorage.setItem("cartDataArray", JSON.stringify(_cartData));
    setCartData(_cartData);
    setlocalStorageUpdate((prevCount) => {
      return prevCount + 1;
    });
  }
  return (
    <>
      <Nav />
      <div className="home-main">
        <div className="products-grid js-products-grid">
          {renderProductsArray}
        </div>
      </div>
    </>
  );
}

export default Home;
