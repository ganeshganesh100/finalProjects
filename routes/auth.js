const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = await User.create({ name, email, password, phone });
    
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // This is a simplified example - in production, fetch from database
    const isValid = await User.validatePassword(password, password); // Use real hashed password from DB
    


module.exports = router;
