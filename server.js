import express from 'express';
import cors from 'cors';
import http from 'http';

import { serverConfig } from './core/config/server.js';
import { testDb } from './core/db/connection.js';
import apiRoutes from './core/src/routes/index.js';
import { requestLogger, errorLogger } from './core/src/middleware/logger.js';
import { errorHandler, notFoundHandler } from './core/src/middleware/errorHandler.js';

const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(requestLogger);

/**
 * Health check
 * - Used by browser, load balancer, monitoring
 */
app.get('/health', async (_, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'tulayasa-api',
    timestamp: new Date().toISOString()
  });
});

/**
 * API Routes
 * All service routes are registered through the routes index
 */
app.use('/api', apiRoutes);

/**
 * 404 Handler - Must be after all routes
 */
app.use(notFoundHandler);

/**
 * Error Handling Middleware - Must be last
 */
app.use(errorLogger);
app.use(errorHandler);

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
      console.log(`📡 API available at http://localhost:${serverConfig.port}/api`);
      console.log(`🏥 Health check at http://localhost:${serverConfig.port}/health`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
