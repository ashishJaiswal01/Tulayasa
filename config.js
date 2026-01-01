// config.js
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = process.env.DB_URL ? {
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
} : process.env.DB_CONNECTION_STRING ? {
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
} : {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'tulayasa',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

export const serverConfig = {
  port: process.env.SERVER_PORT || 3001,
  https: process.env.HTTPS === 'true',
  keyPath: process.env.KEY_PATH || './certs/key.pem',
  certPath: process.env.CERT_PATH || './certs/cert.pem',
};