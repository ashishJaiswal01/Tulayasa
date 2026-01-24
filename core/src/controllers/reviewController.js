import { getSupabaseClient } from '../../db/connection.js';

/**
 * Get all published reviews
 * @route GET /api/reviews
 */
export async function getPublishedReviews(req, res) {
  try {
    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/reviews?select=*&status=eq.PUBLISHED&order=created_at.desc`,
      {
        headers: client.headers
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews', 
      message: error.message 
    });
  }
}

/**
 * Create a new review
 * @route POST /api/reviews
 */
export async function createReview(req, res) {
  try {
    const { name, review, rating } = req.body;

    // Validation
    if (!name || !review || !rating) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['name', 'review', 'rating'] 
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }

    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/reviews`,
      {
        method: 'POST',
        headers: {
          ...client.headers,
          'Prefer': 'return=representation' // Return inserted row
        },
        body: JSON.stringify({
          name,
          review,
          rating,
          status: 'PENDING' // Default status, can be changed to 'PUBLISHED' if auto-approve
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create review: ${error}`);
    }

    const data = await response.json();
    
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ 
      error: 'Failed to create review', 
      message: error.message 
    });
  }
}

/**
 * Get a single review by ID
 * @route GET /api/reviews/:id
 */
export async function getReviewById(req, res) {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();
    
    const response = await fetch(
      `${client.url}/rest/v1/reviews?id=eq.${id}&select=*`,
      {
        headers: client.headers
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch review: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ 
      error: 'Failed to fetch review', 
      message: error.message 
    });
  }
}
