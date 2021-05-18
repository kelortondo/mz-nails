const Location = require('../models/location.js');

const updateLocation = (data, cb) => {
  const query = { date: data.date };
  const options = { upsert: true, new: true, rawResult: true}
  Location.findOneAndUpdate(query, data, options, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
};

const getLocation = () => {
  Location.find({}, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

module.exports = { updateLocation, getLocation };