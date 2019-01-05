const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://root:root123@ds151863.mlab.com:51863/homeaway",
  { useNewUrlParser: true }
);

var User = mongoose.model("Users", {
  email_address: {
    type: String
  },
  password: {
    type: String
  },
  type: {
    type: String,
    enum: ["traveller", "owner"]
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone_no: {
    type: String,
    minlength: 10
  },
  about_me: {
    type: String,
    maxlength: 500
  },
  country: {
    type: String
  },
  company: {
    type: String
  },
  school: {
    type: String
  },
  hometown: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  languages: {
    type: String
  }
});

module.exports = { User };
