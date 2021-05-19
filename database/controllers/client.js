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

const getApprovedApts = (cb) => {
  Client.find({ approved: true}, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

module.exports = { createClient, getClients, getRequestedApts, deleteRequest, approveRequest, getApprovedApts };