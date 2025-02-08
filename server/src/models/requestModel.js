const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({    
  orphanage_id: { type: mongoose.Types.ObjectId, ref: 'orphanage_tb' },
  donations: { type: String, require: true },
  requested_quantity: { type: String, require: true },
  food_type: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: String, require: true },
  date: { type: Date, default: Date.now}
});

var requestData = mongoose.model('request_tb', requestSchema);

module.exports = requestData;