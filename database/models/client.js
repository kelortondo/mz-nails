const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  aptDate: Date,
  location: String,
  manicure: Boolean,
  pedicure: Boolean,
  phone: String,
  service: String,
  approved: Boolean
});

module.exports = mongoose.models.Client || mongoose.model('Client', clientSchema);