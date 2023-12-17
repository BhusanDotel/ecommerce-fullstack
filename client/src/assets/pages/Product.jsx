import React from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { postRatingRoute } from "../Utils/APIRoutes";
import { postReviewRoute } from "../Utils/APIRoutes";
import { host } from "../Utils/APIRoutes";
import { useParams } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import { fetchSingleProductRoute } from "../Utils/APIRoutes";
import { fetchRatingRoute } from "../Utils/APIRoutes";
import { fetchReviewRoute } from "../Utils/APIRoutes";
import { getDate } from "../service/Date";
import LoadingScreen from "../components/LoadingScreen";
import io from "socket.io-client";
import "../styles/SingleProduct.css";

const socket = io.connect(host);

function Product() {
  const { productid } = useParams();
  const {
    userAuthToken,
    cartData,
    setlocalStorageUpdate,
    setCartData,
    email,
    firstName,
    lastName,
  } = React.useContext(StateContext);
  const [quantity, setQuantity] = React.useState(1);
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState("");
  const [newRating, setNewRating] = React.useState(1);
  const [productInfo, setProductInfo] = React.useState("");
  const [isAdded, setAdded] = React.useState(false);
  const [isNewRate, setIsNewRate] = React.useState(false);
  const [newReview, setNewReview] = React.useState("");
  const [isUpdateInput, setUpdateInput] = React.useState(false);
  const [isCancelUpdate, setCancelUpdate] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);
  const [trigger, setTrigger] = React.useState(0);

  function handleQuantity(e) {
    const _quantity = e.target.value;
    const _quantityInt = parseInt(_quantity);
    setQuantity(_quantityInt);
  }
  function timeAndDate() {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1; // Months are 0-based, so add 1.
    const day = currentDateTime.getDate();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedDateTime = `${year}-${month}-${day} ${formattedHours}:${minutes} ${amOrPm}`;
    return formattedDateTime;
  }

  function addToCart() {
    showAddedMsg();
    const cartdata = {
      _id: productid,
      deliveryOption: { deliveryCost: 0, deliveryDate: getDate().seventhDate },
      name: productInfo.name,
      price: productInfo.price,
      orderDate: timeAndDate(),
      quantity: quantity,
      availableQuantity: productInfo.quantity,
      image: productInfo.image.source,
    };

    const _cartData = [...cartData];
    _cartData.push(cartdata);
    localStorage.setItem("cartDataArray", JSON.stringify(_cartData));
    setCartData(_cartData);
    setlocalStorageUpdate((prevCount) => {
      return prevCount + 1;
    });
  }

  let timeoutId;
  function showAddedMsg() {
    setAdded(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  function toggleShowUpdate() {
    setUpdateInput((prevState) => {
      return !prevState;
    });
  }

  function handleNewQuantity(event) {
    if (event.target.value === "") {
      setCancelUpdate(true);
      setQuantity(event.target.value);
    } else {
      setCancelUpdate(false);
      setQuantity(parseInt(event.target.value));
    }
  }

  function updateQuantity() {
    setCancelUpdate(true);
  }

  function cancelUpdate() {
    setUpdateInput(true);
  }

  React.useEffect(() => {
    getPrpductInfo();
    async function getPrpductInfo() {
      if (productid && userAuthToken) {
        try {
          const res = await axios.post(fetchSingleProductRoute, {
            productid,
            userAuthToken,
          });

          if (res.data) {
            setProductInfo(res.data);
            setLoading(false);
          }
        } catch (error) {}
      }
    }
  }, []);

  React.useEffect(() => {
    getRating();
    getReview();
    async function getRating() {
      await axios
        .post(fetchRatingRoute, { userAuthToken, productid })
        .then((res) => {
          if (res.data) {
            setRating(res.data);
          }
        });
    }
    async function getReview() {
      await axios
        .post(fetchReviewRoute, { userAuthToken, productid })
        .then((res) => {
          if (res.data) {
            setReview(res.data);
          }
        });
    }
  }, [trigger]);

  React.useEffect(() => {
    getRating();
    getReview();
    async function getRating() {
      await axios
        .post(fetchRatingRoute, { userAuthToken, productid })
        .then((res) => {
          if (res.data) {
            setRating(res.data);
          }
        });
    }
    async function getReview() {
      await axios
        .post(fetchReviewRoute, { userAuthToken, productid })
        .then((res) => {
          if (res.data) {
            setReview(res.data);
          }
        });
    }
  }, [trigger]);

  React.useEffect(() => {
    const handleReceiveReview = (data) => {
      if (data) {
        trigger();
      }
    };
    const handleReceiveRating = (data) => {
      if (data) {
        trigger();
      }
    };

    function trigger() {
      setTrigger((prevCount) => prevCount + 1);
    }

    socket.on("receive_review", handleReceiveReview);
    socket.on("receive_rating", handleReceiveRating);

    return () => {
      socket.off("receive_review", handleReceiveReview);
      socket.off("receive_rating", handleReceiveRating);
    };
  }, [socket]);

  let reviewRenderArray;
  if (review) {
    reviewRenderArray = review.map((review, index) => {
      return (
        <div key={index} className="review-row">
          <p className="reviewer-name">{review.reviewer}</p>
          <p className="review-text">{review.review}</p>
        </div>
      );
    });
  }

  let quantitySelectionRenderarray = [];
  if (productInfo) {
    for (
      let i = 1;
      i <= (productInfo.quantity < 10 ? productInfo.quantity : 10);
      i++
    ) {
      const selectionOption = (
        <option key={i} value={i}>
          {i}
        </option>
      );
      quantitySelectionRenderarray.push(selectionOption);
    }
  }

  const toggleRating = () => {
    setIsNewRate((prevState) => {
      return !prevState;
    });
    setNewRating(1);
  };

  const handleRating = (e) => {
    const _rating = e.target.value;
    const _ratingInt = parseFloat(_rating);
    setNewRating(_ratingInt);
  };

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const SaveNewRating = async () => {
    if (userAuthToken && email && productid && newRating) {
      await axios
        .post(postRatingRoute, {
          userAuthToken,
          email,
          productid,
          newRating,
        })

        .then((res) => {
          if (res.data) {
            if (res.data === "rating entry success") {
              setIsNewRate((prevState) => {
                return !prevState;
              });
            }
          }
        });
      await socket.emit("send_rating", newRating);
    }
  };

  const submitReview = async () => {
    if (
      userAuthToken &&
      productid &&
      email &&
      firstName &&
      lastName &&
      newReview
    ) {
      await axios
        .post(postReviewRoute, {
          userAuthToken,
          productid,
          email,
          firstName,
          lastName,
          newReview,
        })
        .then(setNewReview(""));
      await socket.emit("send_review", newReview);
    }
  };

  return (
    <>
      <main className="singleproduct-root">
        <div className="singleproduct-nav-container">
          <Nav />
        </div>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {productInfo && (
              <div className="singleproduct-product-container">
                <div className="singleproduct-product-image">
                  <img
                    className="singleproduct-image"
                    src={productInfo.image.source}
                    alt={productInfo.image.img_name}
                  />
                </div>
                <div className="singleproduct-product-info">
                  <h1 className="singleproduct-name">{productInfo.name}</h1>

                  <div
                    className={`singleproduct-quantity-container ${
                      productInfo.quantity > 0 && productInfo.quantity <= 5
                        ? "limitedstock"
                        : productInfo.quantity > 5
                        ? "instock"
                        : "outstock"
                    }`}
                  >
                    {productInfo.quantity > 0 && productInfo.quantity <= 5
                      ? "Limited stock"
                      : productInfo.quantity > 5
                      ? "In stock"
                      : "Out of stock"}
                  </div>

                  <h4 className="singleproduct-price">
                    Price: Rs {productInfo.price / 100}
                  </h4>

                  <div className="product-quantity-container">
                    <select
                      name="quantity"
                      onChange={handleQuantity}
                      value={quantity}
                    >
                      {productInfo.quantity ? (
                        quantitySelectionRenderarray
                      ) : (
                        <option key={0} value={0}>
                          0
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="product-quantity js-product-quantity singleproduct-newquantity">
                    <span>
                      Quantity:{" "}
                      {!isUpdateInput ? (
                        <span className="quantity-label">{quantity}</span>
                      ) : (
                        <input
                          onChange={handleNewQuantity}
                          name="quantity"
                          className="update-product-input"
                          value={quantity}
                          type="number"
                        ></input>
                      )}
                    </span>
                    <span
                      className="update-quantity-link link-primary"
                      onClick={toggleShowUpdate}
                    >
                      {isUpdateInput ? (
                        <span>
                          {!isCancelUpdate ? (
                            <span onClick={updateQuantity}>Save</span>
                          ) : (
                            <span onClick={cancelUpdate}>Cancel</span>
                          )}
                        </span>
                      ) : (
                        "Update"
                      )}
                    </span>
                  </div>

                  <div className="singelproduct-button-addedmsg">
                    {productInfo.quantity > 0 ? (
                      <button
                        onClick={addToCart}
                        className="add-to-cart-button button-primary singleproduct-button"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button className="add-to-cart-button button-primary singleproduct-button-disable">
                        Add to Cart
                      </button>
                    )}
                    <div
                      className={`added-to-cart ${
                        isAdded ? "added-to-cart-display added" : ""
                      }`}
                    >
                      {isAdded && (
                        <img
                          className="added-to-cart-img"
                          src="/images/icons/checkmark.png"
                        />
                      )}
                      Added
                    </div>
                  </div>

                  {rating && (
                    <div className="show-rating-container">
                      <img
                        className="product-rating-stars singleproduct-rating"
                        src={`/images/ratings/rating-${rating.stars * 10}.png`}
                      />
                      <p className="singleproduct-rating-count">
                        {/* {productInfo.rating.count} */}
                        {rating.count}
                      </p>
                    </div>
                  )}
                  <div className="new-Rating-container">
                    {productInfo.trueCustomers.includes(email) ? (
                      <p
                        onClick={toggleRating}
                        className="rate-this-product-text"
                      >
                        {isNewRate ? "Cancel Rating" : "Rate this product"}
                      </p>
                    ) : (
                      <p className="rate-this-product-text rate-this-product-disable">
                        {isNewRate ? "Cancel Rating" : "Rate this product"}
                      </p>
                    )}

                    {isNewRate && (
                      <>
                        <div className="adding-review-display">
                          <div>
                            <select
                              className="new-rating"
                              name="newRating"
                              onChange={handleRating}
                              value={newRating}
                            >
                              <option value={1}>1</option>
                              <option value={1.5}>1.5</option>
                              <option value={2}>2</option>
                              <option value={2.5}>2.5</option>
                              <option value={3}>3</option>
                              <option value={3.5}>3.5</option>
                              <option value={4}>4</option>
                              <option value={4.5}>4.5</option>
                              <option value={5}>5</option>
                            </select>
                          </div>
                        </div>

                        <button
                          className="new-rating-save-button"
                          onClick={SaveNewRating}
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>

                  <fieldset className="singleproduct-description">
                    <legend className="description-legend">Description</legend>
                    {productInfo.description}
                  </fieldset>
                </div>
                <div className="singleproduct-review-root">
                  <h4 className="reviews-title">Reviews</h4>
                  <div className="reviews-container">
                    {reviewRenderArray}
                    <div className="review-input-reviewsave-container">
                      <div className="review-input-container">
                        <textarea
                          onChange={handleReviewChange}
                          value={newReview}
                          name="newReview"
                          className="review-input"
                          placeholder="Enter your reviews.."
                          rows="4"
                          cols="50"
                        ></textarea>
                      </div>
                      <div className="review-save-container">
                        {productInfo.trueCustomers.includes(email) ? (
                          <button
                            onClick={submitReview}
                            className="review-submit-button"
                          >
                            Submit
                          </button>
                        ) : (
                          <button className="review-submit-button review-submit-button-disable">
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <p className="note-text">
              Note: {""}
              <span className="note-text-span">
                Only true customers can rate products and add reviews.
              </span>
            </p>
          </>
        )}
      </main>
    </>
  );
}

export default Product;
