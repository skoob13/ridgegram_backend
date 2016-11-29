import express from 'express';
import authRoutes from './auth.route';
import accountRoutes from './account.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount sign in and sign up routes at /
router.use('/', authRoutes);

// mount account actions routes at /
router.use('/', accountRoutes);

export default router;
