import Goal from '../models/Goal.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, data: goals });
  } catch (error) {
    console.error('Fetch goals error: ', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve goals.' });
  }
};

export const toggleGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }
    goal.completed = !goal.completed;
    await goal.save();
    return res.status(200).json({ success: true, data: goal });
  } catch (error) {
    console.error('Toggle goal error: ', error);
    return res.status(500).json({ success: false, message: 'Failed to update goal.' });
  }
};
