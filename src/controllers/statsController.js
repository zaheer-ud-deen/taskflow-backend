const Task = require('../models/task');

// Get all statistics
exports.getStats = async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: 'Completed' });
    const pending = await Task.countDocuments({ status: 'Pending' });
    
    res.json({
      total,
      completed,
      pending,
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};