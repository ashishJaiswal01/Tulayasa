// routes/reviews.js
import express from 'express';
import { pool } from '../server.js';

const router = express.Router();

// GET /api/reviews - Fetch all reviews
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews - Submit a new review
router.post('/', async (req, res) => {
  const { name, review, rating } = req.body;
  if (!name || !review || !rating) {
    return res.status(400).json({ error: 'Name, review, and rating are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO reviews (name, review, rating, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [name, review, rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

export default router;