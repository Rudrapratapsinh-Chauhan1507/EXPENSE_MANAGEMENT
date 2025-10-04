const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  currency: { type: String, default: 'USD' },
  category: String,
  description: String,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' },
  currentStep: { type: String, default: 'Manager' },
  approvals: [{ approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, action: String, date: Date }],
});

module.exports = mongoose.model('Expense', expenseSchema);
