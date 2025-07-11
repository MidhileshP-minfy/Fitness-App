import express from 'express';
import { logFoodEntry } from '../controllers/dataEntry.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, logFoodEntry);

export default router;