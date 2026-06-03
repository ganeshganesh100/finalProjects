const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    // Fetch from MongoDB in production
    const bookings = [];
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch user's bookings from MongoDB
    res.json({ message: `Bookings for user ${userId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const { userId, roomId, startDate, endDate, notes } = req.body;

    if (!userId || !roomId || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate total price (assuming pricePerHour is 50 for demo)
    const totalPrice = Booking.calculatePrice(50, new Date(startDate), new Date(endDate));
    
    const newBooking = await Booking.create({
      userId,
      roomId,
      startDate,
      endDate,
      totalPrice,
      notes
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel booking
router.put('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    // Update booking status to cancelled in MongoDB
    res.json({ message: `Booking ${id} cancelled` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check availability
router.post('/check-availability', async (req, res) => {
  try {
    const { roomId, startDate, endDate } = req.body;
    // Check against existing bookings in MongoDB
    res.json({ available: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;