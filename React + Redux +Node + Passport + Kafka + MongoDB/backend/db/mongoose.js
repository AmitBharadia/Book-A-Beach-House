const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://root:root123@ds151863.mlab.com:51863/homeaway",
  { useNewUrlParser: true }
);

module.exports = { mongoose };
