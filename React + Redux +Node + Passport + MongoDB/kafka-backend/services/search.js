var { Property } = require("../models/Property");

function handle_request(msg, callback) {
  console.log(
    "============================In the kafka-backend Login====================="
  );
  console.log("Request body:" + JSON.stringify(msg));
  var query = {};
  if (msg.location != "" && msg.location) {
    query["location"] = { $regex: msg.location, $options: "i" };
  }

  if (msg.available_from != "" && msg.available_from) {
    query["available_from"] = {
      $lte: new Date(msg.available_from.substring(0, 10))
    };
  }

  if (msg.available_to != "" && msg.available_to) {
    query["available_to"] = {
      $gte: new Date(msg.available_to.substring(0, 10))
    };
  }

  if (msg.guests != "" && msg.guests) {
    query["max_guests"] = {
      $gte: Number(msg.guests)
    };
  }

  console.log(query);

  Property.find(query, (err, property) => {
    if (err) {
      console.log("Error occured :", err);
      callback(err, null);
    } else {
      console.log(JSON.stringify(property));
      callback(null, property);
    }
    console.log(
      "============================Out of the kafka-backend Login====================="
    );
  });
}

exports.handle_request = handle_request;
