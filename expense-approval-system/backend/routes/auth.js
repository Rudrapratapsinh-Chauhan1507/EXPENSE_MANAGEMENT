const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Company = require('../models/Company');

// -------- SIGNUP --------
router.post('/signup', async (req, res) => {
  try {
    const { companyName, currency, name, email } = req.body;

    if (!companyName || !name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Check if company exists
    let company = await Company.findOne({ name: companyName });
    if (!company) {
      // First signup → create company
      company = new Company({ name: companyName, currency: currency || 'USD' });
      await company.save();
    }

    // Hash default password (or you can accept password from form)
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      company: company._id
    });

    await newUser.save();

    return res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      company: { _id: company._id, name: company.name, currency: company.currency }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// -------- LOGIN --------
router.post('/login', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) return res.status(400).json({ message: 'Email and Name required' });

    const user = await User.findOne({ email }).populate('company');
    if (!user) return res.status(400).json({ message: 'User not found' });

    // For demo, simple name check (replace with real password auth)
    if (user.name !== name) return res.status(400).json({ message: 'Invalid credentials' });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: { _id: user.company._id, name: user.company.name, currency: user.company.currency }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;
