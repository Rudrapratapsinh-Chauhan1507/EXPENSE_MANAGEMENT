const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Update user
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

module.exports = router;
