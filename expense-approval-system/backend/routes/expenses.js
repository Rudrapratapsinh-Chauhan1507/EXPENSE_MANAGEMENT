const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const User = require('../models/User');

// Submit expense
router.post('/', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// Get all expenses
router.get('/', async (req, res) => {
  const expenses = await Expense.find().populate('employeeId', 'name');
  res.json(expenses.map(e => ({
    ...e._doc,
    employeeName: e.employeeId.name
  })));
});

module.exports = router;
