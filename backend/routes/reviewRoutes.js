const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsForPet,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// POST /api/reviews
router.post('/', createReview);

// GET /api/reviews/pet/:petId
router.get('/pet/:petId', getReviewsForPet);

// PUT /api/reviews/:reviewId
router.put('/:reviewId', updateReview);

// DELETE /api/reviews/:reviewId
router.delete('/:reviewId', deleteReview);

module.exports = router;
