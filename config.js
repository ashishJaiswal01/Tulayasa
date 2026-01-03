// config.js
import dotenv from 'dotenv';

dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
});

export const query = (text, params) => pool.query(text, params);

export const serverConfig = {
  port: process.env.SERVER_PORT || 3001,
  https: process.env.HTTPS === 'true',
  keyPath: process.env.KEY_PATH || './certs/key.pem',
  certPath: process.env.CERT_PATH || './certs/cert.pem',
};