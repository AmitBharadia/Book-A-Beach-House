var { Property } = require("../models/Property");

function handle_request(msg, callback) {
  console.log(
    "============================In the kafka-backend Add property====================="
  );
  console.log("Request msg:" + JSON.stringify(msg));
  var userId = msg.userId ? msg.userId : "";
  Property.create(
    {
      user_id: userId,
      location: msg.location,
      headline: msg.headline,
      description: msg.description,
      type: msg.type,
      price: msg.price,
      max_guests: msg.max_guests,
      bedrooms: msg.bathrooms,
      bathrooms: msg.bathrooms,
      sqft: msg.sqft,
      available_from: msg.available_from,
      available_to: msg.available_to
    },
    (err, property) => {
      console.log("Added property: ", property);
      if (err) {
        callback(err, null);
      } else {
        callback(null, true);
      }
      console.log(
        "============================Out of the kafka-backend Add property====================="
      );
    }
  );
}

exports.handle_request = handle_request;
