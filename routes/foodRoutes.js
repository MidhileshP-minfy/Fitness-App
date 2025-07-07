import express from 'express';
import { searchFoods, getFoodById } from '../controllers/foodController.js';
import auth from '../middleware/authMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { logWater } from '../controllers/logWater.js';
import { logWeight } from '../controllers/logWeight.js';

const router = express.Router();

router.get('/search', auth, searchFoods);
router.get('/:id', auth, getFoodById);
router.post('/waterlog',authMiddleware,logWater);
router.post('/weightlog',authMiddleware,logWeight);
export default router;