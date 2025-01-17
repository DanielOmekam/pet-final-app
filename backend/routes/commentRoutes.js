const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsForReview,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// POST /api/comments
router.post('/', createComment);

// GET /api/comments/review/:reviewId
router.get('/review/:reviewId', getCommentsForReview);

// PUT /api/comments/:commentId
router.put('/:commentId', updateComment);

// DELETE /api/comments/:commentId
router.delete('/:commentId', deleteComment);

module.exports = router;
