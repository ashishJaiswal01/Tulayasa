// Controllers/reviewController.js

// GET /api/reviews
export async function getPublishedReviews(request, env) {
  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/reviews?select=*&status=eq.PUBLISHED&order=created_at.desc`,
    {
      headers: {
        "apikey": env.SUPABASE_KEY,
        "Authorization": `Bearer ${env.SUPABASE_KEY}`,
      },
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// POST /api/reviews
export async function createReview(body, env) {
  if (!body) {
    return new Response(
      JSON.stringify({ error: "Missing request body" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  console.log("📩 Incoming review body:", body);

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/reviews`, {
    method: "POST",
    headers: {
      "apikey": env.SUPABASE_KEY,
      "Authorization": `Bearer ${env.SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"  // return inserted row
    },
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    console.error("❌ Supabase error parsing JSON:", err);
  }

  console.log("➡️ Supabase Insert:", res.status, data);

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
