const express = require('express');
const ReviewController = require('./../controllers/reviewController');

const router = express.Router();

router.route('/').get(ReviewController.getAllReviews);

module.exports = router;
