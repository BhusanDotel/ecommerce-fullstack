import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Product from "../components/Product";
// import ProductArray from "../data/Products";
import { StateContext } from "../context/StateContext";
import "../styles/Products/Products.css";
import { fetchProductRoute } from "../Utils/APIRoutes";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

function Products() {
  const { cartData, setlocalStorageUpdate, setCartData, userAuthToken } =
    React.useContext(StateContext);
  const [ProductData, setProductData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const navigate = useNavigate();

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
      const response = await axios.post(fetchProductRoute, { userAuthToken });
      const data = response.data;
      if (data === "unauthorize excess") {
        localStorage.clear();
        navigate("/login");
      }
      setProductData(data);
      setLoading(false);
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

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="home-main">
          <div className="products-grid js-products-grid">
            {renderProductsArray}
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
