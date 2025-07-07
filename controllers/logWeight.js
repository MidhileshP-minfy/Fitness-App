import WeightLog from '../models/WeightLog.js';

export const logWeight = async (req, res) => {
  try {
    const { weight_kg, log_date } = req.body;

    const log = new WeightLog({
      user: req.user.id,
      weight_kg,
      log_date
    });

    await log.save();
    res.status(201).json({ success: true, weightLog: log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log weight' });
  }
};