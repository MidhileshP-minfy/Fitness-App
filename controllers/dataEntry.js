import DiaryEntry from '../models/DiaryEntry.js';
import mongoose from 'mongoose';

export const getDashboard = async (req, res) => {
  try {
    const { date } = req.query;
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const dailyData = await DiaryEntry.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          log_date: { $gte: start, $lte: end }
        }
      },
      {
        $lookup: {
          from: 'foods',
          localField: 'food',
          foreignField: '_id',
          as: 'foodDetails'
        }
      },
      { $unwind: '$foodDetails' },
      {
        $group: {
          _id: '$user',
          total_calories: { $sum: { $multiply: ['$quantity', '$foodDetails.calories'] } },
          total_protein: { $sum: { $multiply: ['$quantity', '$foodDetails.protein'] } },
          total_carbs: { $sum: { $multiply: ['$quantity', '$foodDetails.carbs'] } },
          total_fat: { $sum: { $multiply: ['$quantity', '$foodDetails.fat'] } }
        }
      }
    ]);

    res.json(dailyData[0] || {});
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};