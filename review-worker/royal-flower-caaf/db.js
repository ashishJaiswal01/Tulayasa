export async function query(sql, params = [], env) {
  const payload = { q: sql, p: params };

  const res = await fetch(`${env.SUPABASE_URL}/functions/v1/raw-sql`, {
    method: "POST",
    headers: {
      "apikey": env.SUPABASE_KEY,
      "Authorization": `Bearer ${env.SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("DB error:", error);
    throw new Error(error);
  }

  return await res.json();
}
