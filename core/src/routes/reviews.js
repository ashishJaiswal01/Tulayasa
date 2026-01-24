import express from 'express';
import {
  getPublishedReviews,
  createReview,
  getReviewById
} from '../controllers/reviewController.js';

const router = express.Router();

/**
 * @route   GET /api/reviews
 * @desc    Get all published reviews
 * @access  Public
 */
router.get('/', getPublishedReviews);

/**
 * @route   GET /api/reviews/:id
 * @desc    Get a single review by ID
 * @access  Public
 */
router.get('/:id', getReviewById);

/**
 * @route   POST /api/reviews
 * @desc    Create a new review
 * @access  Public
 */
router.post('/', createReview);

export default router;
