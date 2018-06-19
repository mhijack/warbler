const mongoose = require('mongoose');

// Enables error logging to console
mongoose.set('debug', true);
// Sets promise syntax to ES2015 promise syntax
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/warbler', {
  keepAlive: true,
  useMongoClient: true
});

module.exports.User = require('./user');