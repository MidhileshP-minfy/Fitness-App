import DiaryEntry from '../models/DiaryEntry.js';


export const logFoodEntry = async (req, res) => {
  try {
    const { food, quantity, mealType, logDate } = req.body;
    const entry = new DiaryEntry({
      user: req.user.id,
      food,
      quantity,
      meal_type: mealType,
      log_date: logDate
    });


    await entry.save();
    res.status(201).json({ success: true, entry });
  } catch (err) {
    console.error('❌ Failed to log food entry:', err);
    res.status(500).json({ error: 'Failed to log food entry', err });
  }
};