var { User } = require("../models/User");
var bcrypt = require("bcryptjs");

function handle_request(msg, callback) {
  console.log(
    "============================In the kafka-backend Login====================="
  );
  console.log("Request body:" + JSON.stringify(msg));

  User.findOne({
    email_address: msg.username
  }).exec((err, user) => {
    if (err) {
      console.log("Error occured while user log in");
      callback(null, null);
    } else if (user) {
      console.log("User details: ", user);
      if (bcrypt.compareSync(msg.password, user.password)) {
        console.log("It is a valid user");
        callback(null, user);
      } else {
        console.log("Incorrect password");
        callback(err, "Invalid Password");
      }
    }
    console.log(
      "============================Out of the kafka-backend Login====================="
    );
  });
}

exports.handle_request = handle_request;
