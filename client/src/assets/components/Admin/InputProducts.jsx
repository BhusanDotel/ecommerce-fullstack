import React from "react";
import axios from "axios";
import { productDataRoute, productImageRoute } from "../../Utils/APIRoutes";
import "../../styles/Admin/InputProducts.css";
import { StateContext } from "../../context/StateContext";

function InputProducts() {
  const { adminAuthToken } = React.useContext(StateContext);
  const [isDiplayMessage, setDisplayMessage] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isResponse, setResponse] = React.useState(false);
  const [isGoodResponse, setGoodResponse] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");

  //data to send to DB
  const [selectedFile, setSelectedFile] = React.useState("");
  const [detail, setDetail] = React.useState({
    name: "",
    price: "",
    rating: {
      stars: 1,
      count: 1,
    },
  });

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    e.preventDefault();
    const _detail = { ...detail };
    _detail[e.target.name] = e.target.value;
    setDetail(_detail);
  }

  const uploadData = async () => {
    const { name, price, rating } = detail;
    if (selectedFile && name && price) {
      setDisplayMessage(true);
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        await axios
          .post(productDataRoute, { adminAuthToken, name, price, rating })
          .then(
            axios.post(productImageRoute, formData).then((res) => {
              if (res.data === "uploaded successfully") {
                setResponse(true);
                setGoodResponse(true);
                setLoading(false);
                detail.name = "";
                detail.price = "";
                setTimeout(() => {
                  setLoading(false);
                  setDisplayMessage(false);
                  setResponse(false);
                  setGoodResponse(false);
                }, 2000);
              } else {
                setResponse(true);
                setGoodResponse(false);
                setLoading(false);
              }
            })
          );
      } catch (error) {
        setDisplayMessage(true);
        setResponse(true);
        setGoodResponse(false);
        setLoading(false);
      }
    } else {
      alert("Do not leave fields empty");
    }
  };

  return (
    <>
      <div className="admin-input-container">
        <div className="admin-input-fields">
          <input
            type="name"
            onChange={handleChange}
            name="name"
            value={detail.name}
            className="admin-input-productName"
            placeholder="ProductName*"
          ></input>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={detail.price}
            className="admin-input-price"
            placeholder="price*"
          ></input>
          <input
            className="admin-input-image"
            onChange={handleImage}
            type="file"
          ></input>
          <button onClick={uploadData} className="admin-update-button">
            Upload Data
          </button>
          {isDiplayMessage && (
            <div className="display-message-container">
              {isLoading && (
                <img
                  className="loading-icon"
                  src="/images/loading-gif.gif"
                  alt="loading..."
                />
              )}
              {isResponse && (
                <>
                  {isGoodResponse && (
                    <p className="upload-good-response">
                      Data uploaded Successfully!!
                    </p>
                  )}
                  {!isGoodResponse && (
                    <p className="upload-bad-response">
                      Something went wrong!!
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="show-input-image">
          <img
            className="updated-image"
            src={imageSrc}
            alt="No image uploaded"
          />
        </div>
      </div>
    </>
  );
}

export default InputProducts;
