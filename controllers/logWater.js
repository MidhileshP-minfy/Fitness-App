import WaterLog from '../models/WaterLog.js';

export const logWater = async (req, res) => {
  try {
    const { quantity_ml, log_date } = req.body;

    const log = new WaterLog({
      user: req.user.id,
      quantity_ml,
      log_date
    });

    await log.save();
    res.status(201).json({ success: true, waterLog: log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log water' });
  }
};