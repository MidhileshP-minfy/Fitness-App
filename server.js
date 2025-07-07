import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import authMiddleware from './middleware/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import diaryRoutes from './routes/diaryRoutes.js'
import foodRoutes from './routes/foodRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
// Routes
app.use('/api/auth',authRoutes);
app.use('/api/user',authMiddleware,userRoutes);
app.use('/api/diary',authMiddleware,diaryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/foods',authMiddleware, foodRoutes);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => {
  console.error("DB connection error:", err.message);
});