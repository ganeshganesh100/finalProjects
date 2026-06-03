const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Get all rooms
router.get('/', async (req, res) => {
  try {
    // In production, fetch from MongoDB
    const rooms = [
      {
        id: 1,
        name: 'Conference Room A',
        description: 'Large conference room',
        capacity: 20,
        location: 'Floor 2',
        amenities: ['Projector', 'Whiteboard', 'Video Conference'],
        pricePerHour: 50,
        available: true
      },
      {
        id: 2,
        name: 'Meeting Room B',
        description: 'Small meeting room',
        capacity: 8,
        location: 'Floor 1',
        amenities: ['Whiteboard', 'TV Screen'],
        pricePerHour: 30,
        available: true
      }
    ];
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get room by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch from MongoDB in production
    res.json({ message: `Room ${id} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create room (Admin only)
router.post('/', async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update room
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Update in MongoDB in production
    res.json({ message: `Room ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete room
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Delete from MongoDB in production
    res.json({ message: `Room ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;