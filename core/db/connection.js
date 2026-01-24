import { supabaseConfig } from '../config/server.js';

/**
 * Test database connectivity
 * @returns {Promise<void>}
 */
export async function testDb() {
  if (!supabaseConfig.url || !supabaseConfig.serviceKey) {
    throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
  }

  try {
    const response = await fetch(
      `${supabaseConfig.url}/rest/v1/`,
      {
        method: 'GET',
        headers: {
          'apikey': supabaseConfig.serviceKey,
          'Authorization': `Bearer ${supabaseConfig.serviceKey}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Database connection failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to connect to database: ${error.message}`);
  }
}

/**
 * Execute a raw SQL query via Supabase
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<any>}
 */
export async function query(sql, params = []) {
  const payload = { q: sql, p: params };

  const res = await fetch(
    `${supabaseConfig.url}/functions/v1/raw-sql`,
    {
      method: 'POST',
      headers: {
        'apikey': supabaseConfig.serviceKey,
        'Authorization': `Bearer ${supabaseConfig.serviceKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    const error = await res.text();
    console.error('DB error:', error);
    throw new Error(error);
  }

  return await res.json();
}

/**
 * Get Supabase REST API client helper
 * @returns {Object} Supabase client configuration
 */
export function getSupabaseClient() {
  return {
    url: supabaseConfig.url,
    headers: {
      'apikey': supabaseConfig.serviceKey,
      'Authorization': `Bearer ${supabaseConfig.serviceKey}`,
      'Content-Type': 'application/json'
    }
  };
}
