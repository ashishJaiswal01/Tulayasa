import reviewRoutes from "./routes/reviews.js";

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    // Parse POST body ONCE
    let body = null;
    if (request.method === "POST") {
      try {
        // request.body can only be read once, so clone
        body = await request.clone().json();
      } catch (err) {
        console.error("❌ Failed to parse JSON body:", err);
      }
    }

    // Health check
    if (pathname === "/health") {
      return json({ status: "UP", service: "review-service" });
    }

    // Routes (pass parsed body)
    if (pathname.startsWith("/api/reviews")) {
      return await reviewRoutes(request, env, body);
    }

    // Default
    return json({ error: "Not Found" }, 404);
  }
};
