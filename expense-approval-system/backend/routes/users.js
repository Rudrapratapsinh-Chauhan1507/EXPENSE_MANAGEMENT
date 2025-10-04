const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Company = require('../models/Company');

// Get all users for a company
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('manager', 'name email');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { name, email, role, managerId, companyId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) return res.status(400).json({ message: 'Company not found' });

    const newUser = await User.create({
      name,
      email,
      role,
      manager: managerId || null,
      company: company._id
    });

    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, role, managerId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.manager = managerId || user.manager;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
