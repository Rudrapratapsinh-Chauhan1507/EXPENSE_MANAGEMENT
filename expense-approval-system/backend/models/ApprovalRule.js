const mongoose = require('mongoose');

const approvalRuleSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['percentage','specific','hybrid'], default: 'percentage' },
  percentage: Number,
  approvers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('ApprovalRule', approvalRuleSchema);
