import dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
  port: process.env.SERVER_PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development'
};

export const supabaseConfig = {
  url: process.env.SUPABASE_URL,
  anonKey: process.env.SUPABASE_ANON_KEY,
  serviceKey: process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
};
