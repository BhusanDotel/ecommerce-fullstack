import React from "react";
import axios from "axios";
import "../styles/SearchWindow.css";
import SearchProduct from "../components/SearchProduct";
import { fetchProductRoute } from "../Utils/APIRoutes";
import { StateContext } from "../context/StateContext";

function SearchWindow(props) {
  const { userAuthToken } = React.useContext(StateContext);
  const [ProductData, setProductData] = React.useState([]);
  const [searchKeyWord, setSearchKeyWord] = React.useState(props.searchKeyWord);
  const [isLoading, setLoading] = React.useState(true);
  const [productNotfound, setProductNotFound] = React.useState(true);

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

  const renderProductsArray = ProductData.map((product, index) => {
    const _name = product.name;
    const name = _name.toLowerCase();
    if (name.includes(searchKeyWord.toLowerCase())) {
      return (
        <SearchProduct
          key={index}
          id={product._id}
          image={product.image}
          name={product.name}
        />
      );
    }
    return null;
  });

  const noProductFound = renderProductsArray.every(
    (product) => product === null
  );

  return (
    <>
      {isLoading ? (
        <>Loading .....</>
      ) : (
        <div className="search-items-container">
          {noProductFound ? (
            <p className="no-product-found">No product found</p>
          ) : (
            renderProductsArray
          )}
        </div>
      )}
    </>
  );
}

export default SearchWindow;
