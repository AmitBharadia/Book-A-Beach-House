const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://root:root123@ds151863.mlab.com:51863/homeaway",
  { useNewUrlParser: true }
);

var Trip = mongoose.model("trip", {
  user_id: {
    type: String
  },
  location: {
    type: String
  },
  headline: {
    type: String
  },
  description: {
    type: String
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  guests: {
    type: Number
  }
});

module.exports = { Trip };
