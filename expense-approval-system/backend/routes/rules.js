const express = require('express');
const router = express.Router();
const ApprovalRule = require('../models/ApprovalRule');

// Get all rules
router.get('/', async (req, res) => {
  try {
    const rules = await ApprovalRule.find().populate('approvers', 'name role');
    res.json(rules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching rules' });
  }
});

// Create a new rule
router.post('/', async (req, res) => {
  try {
    const { name, type, percentage, approvers } = req.body;
    const newRule = await ApprovalRule.create({ name, type, percentage, approvers });
    const populatedRule = await ApprovalRule.findById(newRule._id).populate('approvers', 'name role');
    res.json(populatedRule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating rule' });
  }
});

module.exports = router;
