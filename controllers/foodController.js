import Food from '../models/Food.js';

// @desc   Search foods by name (case-insensitive)
// @route  GET /api/foods/search?query=rice
// @access Private (requires auth middleware)
export const searchFoods = async (req, res) => {
  try {
    const query = req.query.search || '';
    const foods = await Food.find({
      name: { $regex: query, $options: 'i' }
    }).limit(20);

    res.json(foods);
  } catch (err) {
    console.error('Error searching foods:', err);
    res.status(500).json({ error: 'Server error while searching foods' });
  }
};

// @desc   Get food by ID
// @route  GET /api/foods/:id
// @access Private
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
  } catch (err) {
    console.error('Error fetching food by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};