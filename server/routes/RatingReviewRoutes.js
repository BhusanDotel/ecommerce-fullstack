const express = require("express");
const router = express.Router();
const RatingReviewController = require("../controllers/RatingReviewController");

router.post("/rating", RatingReviewController.rating);
router.post("/review", RatingReviewController.review);

module.exports = router;
