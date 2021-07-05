const Location = require('../models/location.js');

const updateLocation = (data, cb) => {
  Location.bulkWrite(data.bulk, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
};

const getLocation = (cb) => {
  Location.aggregate([
    {
      $group: {
        _id: "$location",
        dates: { $push: "$date" }
      }
    }
  ])
  .exec(cb);
}

module.exports = { updateLocation, getLocation };