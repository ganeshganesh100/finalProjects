const express = require('express');
const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch user from MongoDB
    res.json({ message: `User ${id} profile` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    // Update user in MongoDB
    res.json({ message: `User ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;