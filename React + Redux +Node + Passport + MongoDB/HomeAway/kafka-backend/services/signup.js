var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

var { User } = require("../models/User");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg);

  console.log("In the rest request signup traveller");
  console.log(
    "============================In the kafka-backend signup====================="
  );
  console.log("Request body:" + JSON.stringify(msg));
  if (msg.password) {
    var password = bcrypt.hashSync(msg.password, salt);
  }

  User.create(
    {
      email_address: msg.emailAddress,
      password: password,
      type: msg.type,
      first_name: msg.firstName,
      last_name: msg.lastName
    },
    (err, user) => {
      console.log("User created :", JSON.stringify(user));

      if (err) {
        console.log("Error occured: ", err);
        callback(err, "Error");
      } else {
        callback(null, true);
      }
      console.log(
        "============================Out of the kafka-backend signup====================="
      );
    }
  );

  console.log("after callback");
}

exports.handle_request = handle_request;
