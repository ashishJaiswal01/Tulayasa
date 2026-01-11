import express from 'express';
import cors from 'cors';
import http from 'http';

import { serverConfig } from './review-worker/config.js';
import { testDb } from './review-worker/royal-flower-caaf/db.js';
import reviewRoutes from './review-worker/royal-flower-caaf/src/routes/reviews.js';

const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * Health check
 * - Used by browser, load balancer, monitoring
 */
app.get('/health', async (_, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'review-service'
  });
});

/**
 * API Routes
 */
app.use('/api/reviews', reviewRoutes);

/**
 * Server bootstrap
 */
async function start() {
  try {
    // 1. Verify DB connectivity (fail fast)
    await testDb();
    console.log('✅ Connected to Supabase PostgreSQL');

    // 2. Start HTTP server only AFTER DB is ready
    http.createServer(app).listen(serverConfig.port, () => {
      console.log(`🚀 Server running on port ${serverConfig.port}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}
app.use((req, res, next) => {
  console.log('➡️', req.method, req.url, req.body);
  next();
});


start();
