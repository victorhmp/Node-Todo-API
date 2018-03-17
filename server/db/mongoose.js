var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // make it use Promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};