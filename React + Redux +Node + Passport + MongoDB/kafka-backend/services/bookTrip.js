var { Trip } = require("../models/Trip");
var { Property } = require("../models/Property");
var ObjectID = require("mongodb").ObjectID;

function handle_request(msg, callback) {
  console.log(
    "============================In the kafka-backend bookTrip====================="
  );
  console.log("Request body:" + JSON.stringify(msg));
  //First find the property and add then create new trip containing details of the property to it
  Property.find({ _id: ObjectID(msg.property_id) }, (err, property) => {
    if (err) {
      console.log("Error occured : " + err);
      callback(err, "Error occured while fetching property");
    } else {
      if (property.length > 0) {
        console.log("Property Found : " + JSON.stringify(property));
        Trip.create(
          {
            user_id: msg.userId ? msg.userId : "",
            location: property[0].location,
            headline: property[0].headline,
            from: msg.fm,
            to: msg.to,
            guests: msg.guests
          },
          (err, trip) => {
            if (err) {
              console.log("Error occured : " + err);
              callback(err, "Error ocurred while fetching trip");
            } else {
              console.log("Trip Added : ", trip);
              callback(null, true);
            }
          }
        );
      } else {
        console.log("No such property present");
        callback(null, "No such property");
      }
    }
    console.log(
      "============================Out of the kafka-backend bookTrip====================="
    );
  });
}

exports.handle_request = handle_request;
