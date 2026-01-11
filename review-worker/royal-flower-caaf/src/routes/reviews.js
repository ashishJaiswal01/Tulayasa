// routes/reviews.js (Worker-friendly)
import { createReview, getPublishedReviews } from "../Controllers/reviewController.js";

export default async function reviewRoutes(request, env, body) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const basePath = "/api/reviews";

  if (request.method === "GET" && pathname.startsWith(basePath)) {
    return await getPublishedReviews(request, env);
  }

  if (request.method === "POST" && pathname.startsWith(basePath)) {
    return await createReview(body, env);
  }

  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
