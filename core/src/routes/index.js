import express from 'express';
import reviewRoutes from './reviews.js';

const router = express.Router();

/**
 * API Routes
 * 
 * To add a new service:
 * 1. Create a controller in src/controllers/[service]Controller.js
 * 2. Create a route file in src/routes/[service].js
 * 3. Import and register it here:
 *    import [service]Routes from './[service].js';
 *    router.use('/[service]', [service]Routes);
 */

// Review service routes
router.use('/reviews', reviewRoutes);

// Example: Add more services in the future
// import userRoutes from './users.js';
// router.use('/users', userRoutes);
//
// import programRoutes from './programs.js';
// router.use('/programs', programRoutes);
//
// import treatmentRoutes from './treatments.js';
// router.use('/treatments', treatmentRoutes);

export default router;
