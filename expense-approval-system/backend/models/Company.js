const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  currency: { type: String, default: 'USD' },
});

module.exports = mongoose.model('Company', companySchema);
