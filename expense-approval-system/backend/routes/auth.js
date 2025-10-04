const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// SECRET for JWT (in production, store securely)
const SECRET = 'supersecretkey';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if first user -> auto-create Admin + Company (simplified)
    const usersCount = await User.countDocuments();
    let role = 'employee';
    if (usersCount === 0) role = 'admin';

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
    res.json({ user: { id: user._id, name: user.name, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Signup failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
    res.json({ user: { id: user._id, name: user.name, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Login failed' });
  }
});

module.exports = router;
