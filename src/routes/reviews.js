// routes/reviews.js
import express from 'express';
import {
  createReview,
  getPublishedReviews
} from '../Controllers/reviewController.js';

const router = express.Router();

// GET /api/reviews
router.get('/', getPublishedReviews);

// POST /api/reviews
router.post('/', createReview);

export default router;
