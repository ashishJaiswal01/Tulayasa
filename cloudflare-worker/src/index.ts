import { Hono } from "hono";

type Env = {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
};

const app = new Hono<{ Bindings: Env }>();

/* -----------------------------
   CORS
-------------------------------- */
app.options("*", (c) =>
  c.body(null, 204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  })
);

/* -----------------------------
   Health check
-------------------------------- */
app.get("/health", (c) => {
  return c.json({ status: "UP", service: "review-service" });
});

/* -----------------------------
   GET /api/reviews
   (Published reviews only)
-------------------------------- */
app.get("/api/reviews", async (c) => {
  const { SUPABASE_URL, SUPABASE_KEY } = c.env;

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/reviews?select=*&status=eq.PUBLISHED&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  const data = await res.json();

  return c.json(data, res.status, {
    "Access-Control-Allow-Origin": "*",
  });
});

/* -----------------------------
   POST /api/reviews
-------------------------------- */
app.post("/api/reviews", async (c) => {
  const { SUPABASE_URL, SUPABASE_KEY } = c.env;

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Missing request body" }, 400);
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return c.json(data, res.status, {
    "Access-Control-Allow-Origin": "*",
  });
});

/* -----------------------------
   Fallback
-------------------------------- */
app.notFound((c) => c.json({ error: "Not Found" }, 404));

export default app;
