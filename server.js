// server.js
import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import cors from 'cors';
import { dbConfig, serverConfig } from './config.js';
import reviewRoutes from './routes/reviews.js';

const app = express();

app.use(cors());
app.use(express.json());

const { Pool } = await import('pg');
export const pool = new Pool(dbConfig);

// Test DB connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Routes
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

if (serverConfig.https) {
  const options = {
    key: fs.readFileSync(serverConfig.keyPath),
    cert: fs.readFileSync(serverConfig.certPath),
  };
  https.createServer(options, app).listen(serverConfig.port, () => {
    console.log(`HTTPS Server running on port ${serverConfig.port}`);
  });
} else {
  http.createServer(app).listen(serverConfig.port, () => {
    console.log(`HTTP Server running on port ${serverConfig.port}`);
  });
}