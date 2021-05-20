const Client = require('../models/client.js');

const createClient = (data, cb) => {
  Client.create(data, function (err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
};

const getClients = (cb) => {
  Client.find({}, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
};

const getRequestedApts = (cb) => {
  Client.find({ approved: false}, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

const deleteRequest = (id, cb) => {
  Client.findByIdAndDelete(id, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

const approveRequest = (id, cb) => {
  Client.findByIdAndUpdate(id, {approved: true}, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

const updateAppointment = (apt, cb) => {
  Client.findByIdAndUpdate(apt._id, {
    firstName: apt.firstName,
    lastName: apt.lastName,
    aptDate: apt.aptDate,
    email: apt.email,
    location: apt.location,
    phone: apt.phone,
    service: apt.service,
    manicure: apt.manicure,
    pedicure: apt.pedicure
  }, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

const getApprovedApts = (date, cb) => {
  if (date) {
    let startDateString = new Date(date).toISOString().slice(0, 10);
    const dateMove = new Date(startDateString);
    dateMove.setDate(dateMove.getDate() + 1);
    let endDateString = dateMove.toISOString().slice(0, 10);

    let start = new Date(startDateString+'T03:00:00.000-03:00');
    let end = new Date(endDateString+'T03:00:00.000-03:00');

    Client.find({ aptDate: { $gte: new Date(start), $lte: new Date(end) } }).sort({aptDate: 1})
    .exec((err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    });

  } else {
    Client.find({approved: true}).sort({aptDate: 1}).exec((err, result) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, result);
      }
    })
  }
}

module.exports = { createClient, getClients, getRequestedApts, deleteRequest, approveRequest, getApprovedApts, updateAppointment };