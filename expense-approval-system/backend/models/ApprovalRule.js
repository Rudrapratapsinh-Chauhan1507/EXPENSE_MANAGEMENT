const mongoose = require('mongoose');

const ApprovalRuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['percentage','specific','hybrid'], required: true },
  percentage: Number,
  approvers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('ApprovalRule', ApprovalRuleSchema);
