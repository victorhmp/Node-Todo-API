var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // make it use Promises
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};