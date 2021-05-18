const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  date: Date,
  location: String
});

module.exports = mongoose.models.Location || mongoose.model('Location', locationSchema);