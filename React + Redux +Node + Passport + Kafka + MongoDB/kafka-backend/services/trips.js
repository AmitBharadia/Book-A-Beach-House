var { Trip } = require("../models/Trip");

function handle_request(msg, callback) {
  console.log(
    "============================In the kafka-backend trips====================="
  );
  console.log("Request body:" + JSON.stringify(msg));
  var userId = msg ? msg : "";
  if (Trip) {
    //Trip.find({}, (err, trips) => {
    Trip.find({ user_id: userId }, (err, trips) => {
      if (err) {
        console.log("Error ocurred :", err);
        callback(err, "Error");
      } else {
        console.log(JSON.stringify(trips));
        callback(null, trips);
      }
      console.log(
        "===================Out of the kafka-backend trips================="
      );
    });
  }
}

exports.handle_request = handle_request;
