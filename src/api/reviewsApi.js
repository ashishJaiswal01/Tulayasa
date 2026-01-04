const BASE_URL = 'http://localhost:3001/api/reviews';

export async function fetchReviews() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function submitReview(review) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (!res.ok) throw new Error('Failed to submit review');
  return res.json();
}
