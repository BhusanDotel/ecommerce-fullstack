const express = require("express");
const router = express.Router();
const RatingReviewController = require("../controllers/RatingReviewController");

router.post("/rating", RatingReviewController.rating);
router.post("/review", RatingReviewController.review);
router.post("/fetchrating", RatingReviewController.fetchRating);
router.post("/fetchreview", RatingReviewController.fetchReview);

module.exports = router;
