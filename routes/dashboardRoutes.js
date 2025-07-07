import express from 'express';
import { getDailySummary } from '../controllers/dashboard.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getDailySummary);

export default router;