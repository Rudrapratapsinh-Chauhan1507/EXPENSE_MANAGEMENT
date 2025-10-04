const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const ApprovalRule = require('../models/ApprovalRule');
const User = require('../models/User');

// Get pending approvals for logged-in user
router.get('/pending', async (req, res) => {
  const user = JSON.parse(req.query.user); // simulate user from frontend
  const expenses = await Expense.find({ status: 'Pending' }).populate('employeeId', 'name');
  const pending = expenses.filter(exp => {
    // Simple logic: show if currentStep matches user's role
    return exp.currentStep.toLowerCase() === user.role.toLowerCase();
  }).map(e => ({
    ...e._doc,
    employeeName: e.employeeId.name
  }));
  res.json(pending);
});

// Approve/Reject expense
router.post('/:expenseId', async (req, res) => {
  const { action, approver } = req.body;
  const expense = await Expense.findById(req.params.expenseId);
  if (!expense) return res.status(404).json({ error: 'Expense not found' });

  // Add approval record
  const approverUser = await User.findOne({ name: approver });
  expense.approvals.push({ approverId: approverUser._id, action, date: new Date() });

  // Multi-step logic
  if (expense.currentStep === 'Manager') expense.currentStep = 'Finance';
  else if (expense.currentStep === 'Finance') expense.currentStep = 'Director';
  else expense.status = action === 'approve' ? 'Approved' : 'Rejected';

  await expense.save();
  res.json(expense);
});

module.exports = router;
