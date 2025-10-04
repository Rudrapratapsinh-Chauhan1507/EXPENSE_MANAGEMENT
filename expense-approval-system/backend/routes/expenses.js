const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const User = require('../models/User');

// Submit new expense
router.post('/', async (req, res) => {
  try {
    const { employeeId, amount, currency, category, description, date } = req.body;
    const employee = await User.findById(employeeId);
    if (!employee) return res.status(400).json({ message: 'Employee not found' });

    const newExpense = await Expense.create({
      employee: employee._id,
      amount,
      currency,
      category,
      description,
      date,
      status: 'Pending',
      currentStep: 0,
      approvers: []
    });

    res.json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting expense' });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate('employee', 'name email role')
      .populate('approvers.approver', 'name role');
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

module.exports = router;
