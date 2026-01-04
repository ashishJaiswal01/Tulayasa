import { pool } from '../../db.js';

export async function createReview(req, res) {
  const { reviewer_name, review_text, rating, video_url } = req.body;

  if (!reviewer_name || !review_text || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO reviews
       (reviewer_name, review_text, rating, video_url, status)
       VALUES ($1, $2, $3, $4, 'PUBLISHED')
       RETURNING *`,
      [reviewer_name, review_text, rating, video_url || null]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPublishedReviews(req, res) {
    try {
      const { rows } = await pool.query(
        `SELECT reviewer_name, review_text, rating, video_url, created_at
         FROM reviews
         WHERE status = 'PUBLISHED'
         ORDER BY created_at DESC
         LIMIT 10`
      );
  
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  