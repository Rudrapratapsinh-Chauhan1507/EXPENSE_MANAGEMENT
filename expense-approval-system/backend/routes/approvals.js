const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const User = require('../models/User');
const ApprovalRule = require('../models/ApprovalRule');

// Approve or reject an expense
router.post('/:expenseId', async (req, res) => {
  try {
    const { action, approverId, comment } = req.body;
    const expense = await Expense.findById(req.params.expenseId).populate('approvers.approver');

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Add approver record if not exists
    let step = expense.approvers.findIndex(a => a.approver._id.toString() === approverId);
    if (step === -1) {
      expense.approvers.push({ approver: approverId, approved: action === 'approve', comment: comment || '' });
    } else {
      expense.approvers[step].approved = action === 'approve';
      expense.approvers[step].comment = comment || '';
    }

    // Multi-step logic: move to next step
    if (action === 'approve') {
      expense.currentStep += 1;
      if (expense.currentStep >= expense.approvers.length) expense.status = 'Approved';
    } else {
      expense.status = 'Rejected';
    }

    await expense.save();
    const populatedExpense = await Expense.findById(expense._id).populate('employee', 'name').populate('approvers.approver', 'name');
    res.json(populatedExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing approval' });
  }
});

// Get pending approvals for a user
router.get('/pending/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const expenses = await Expense.find({
      'approvers.approver': userId,
      status: 'Pending'
    }).populate('employee', 'name email');
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching pending approvals' });
  }
});

module.exports = router;
