const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  category: String,
  description: String,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' },
  currentStep: { type: Number, default: 0 },
  approvers: [
    {
      approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      approved: { type: Boolean, default: false },
      comment: { type: String, default: '' }
    }
  ]
});

module.exports = mongoose.model('Expense', ExpenseSchema);
