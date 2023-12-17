const ProductData = require("../models/productsModel");
const UserData = require("../models/userModel");

const rating = async (req, res) => {
  if (req.body) {
    const { userAuthToken, productid, email, newRating } = req.body;
    if (newRating && productid && email && userAuthToken) {
      if (userAuthToken) {
        const isUser = await UserData.findOne({ userToken: userAuthToken });
        if (isUser) {
          const productExists = await ProductData.findOne({ _id: productid });
          if (productExists) {
            if (productExists.trueCustomers.includes(email)) {
              const ratersList = productExists.rating.raters;
              const emailToCheck = email;
              const isEmailInRaterList = ratersList.some(
                (obj) => obj.email === emailToCheck
              );
              if (!isEmailInRaterList) {
                const raterObj = {
                  email: email,
                  rating: newRating,
                };
                ratersList.push(raterObj);
                productExists.rating.raters = ratersList;
                let _count = productExists.rating.count;
                _count++;
                let _totalStars = productExists.rating.totalStars;
                _totalStars += newRating;
                productExists.rating.totalStars = _totalStars;
                productExists.rating.count = _count;
                const roundedAverageRating =
                  Math.round((_totalStars / _count) * 2) / 2;

                productExists.rating.stars = roundedAverageRating;
              } else {
                let _count = productExists.rating.count;
                let _totalStars = productExists.rating.totalStars;
                const foundObject = ratersList.find(
                  (obj) => obj.email === emailToCheck
                );
                const lastRating = foundObject.rating;
                _totalStars = _totalStars - lastRating;
                _totalStars += newRating;
                productExists.rating.totalStars = _totalStars;
                productExists.rating.count = _count;
                const roundedAverageRating =
                  Math.round((_totalStars / _count) * 2) / 2;

                productExists.rating.stars = roundedAverageRating;
                foundObject.rating = newRating;
              }
              productExists.markModified("rating");
              await productExists.save();
              res.json("rating entry success");
            }
          }
        } else {
          res.json("unauthorize excess");
        }
      }
    }
  }
};

const review = async (req, res) => {
  if (req.body) {
    const { userAuthToken, productid, email, firstName, lastName, newReview } =
      req.body;
    if (
      userAuthToken &&
      productid &&
      email &&
      firstName &&
      lastName &&
      newReview
    ) {
      if (userAuthToken) {
        const isUser = await UserData.findOne({ userToken: userAuthToken });
        if (isUser) {
          const productExists = await ProductData.findOne({ _id: productid });
          if (productExists) {
            if (productExists.trueCustomers.includes(email)) {
              const reviewList = productExists.review;
              const emailToCheck = email;
              const isEmailInReviewList = reviewList.some(
                (obj) => obj.email === emailToCheck
              );
              if (!isEmailInReviewList) {
                const reviewObj = {
                  email: email,
                  reviewer: `${firstName} ${lastName}`,
                  review: newReview,
                };
                reviewList.push(reviewObj);
                productExists.review = reviewList;
              } else {
                const foundObject = reviewList.find(
                  (obj) => obj.email === emailToCheck
                );
                foundObject.review = newReview;
              }
              productExists.markModified("review");
              await productExists.save();
              res.json("rating entry success");
            }
          }
        } else {
          res.json("unauthorize excess");
        }
      }
    }
  }
};

const fetchRating = async (req, res) => {
  if (req.body) {
    const { productid, userAuthToken } = req.body;
    if (productid && userAuthToken) {
      const userExists = await UserData.findOne({ userToken: userAuthToken });
      if (userExists) {
        try {
          const productExists = await ProductData.findOne({ _id: productid });
          if (productExists) {
            res.json(productExists.rating);
          }
        } catch (error) {
          res.json(error);
        }
      }
    }
  }
};

const fetchReview = async (req, res) => {
  if (req.body) {
    const { productid, userAuthToken } = req.body;
    if (productid && userAuthToken) {
      const userExists = await UserData.findOne({ userToken: userAuthToken });
      if (userExists) {
        try {
          const productExists = await ProductData.findOne({ _id: productid });
          if (productExists) {
            res.json(productExists.review);
          }
        } catch (error) {
          res.json(error);
        }
      }
    }
  }
};

module.exports = {
  rating,
  review,
  fetchRating,
  fetchReview,
};
