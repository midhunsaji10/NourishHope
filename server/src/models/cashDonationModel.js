const mongoose = require('mongoose');

const cashDontionSchema = new mongoose.Schema({
  login_id: { type: mongoose.Types.ObjectId, ref: 'user_tb' },
  orphanage_id : { type: mongoose.Types.ObjectId, ref: 'orphanage_tb' },
  amount: { type: String, require: true },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

var cashDontionData = mongoose.model('cash_dontion_tb', cashDontionSchema);

module.exports = cashDontionData; 