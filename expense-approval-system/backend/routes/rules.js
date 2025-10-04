const express = require('express');
const router = express.Router();
const ApprovalRule = require('../models/ApprovalRule');

// Get rules
router.get('/', async (req, res) => {
  const rules = await ApprovalRule.find().populate('approvers', 'name');
  res.json(rules);
});

// Save rule
router.post('/', async (req, res) => {
  const rule = new ApprovalRule(req.body);
  await rule.save();
  res.json(rule);
});

module.exports = router;
