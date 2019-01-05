var { Property } = require("../models/Property");
var ObjectID = require("mongodb").ObjectID;
var fs = require("fs");
var path = require("path");

function handle_request(msg, callback) {
  console.log(
    "============================In the kafka-backend property-photos====================="
  );
  console.log("Request body:" + JSON.stringify(msg));

  if (msg._id) {
    Property.findOne({ _id: ObjectID(msg._id) }, (err, property) => {
      if (err) {
        console.log("Error Occured ", err);
        res.end("Error Ocurred");
      } else {
        if (property) {
          console.log();
          var folder = property.location + "_" + property.headline;
          var file_location = path.join(
            __dirname + "/../uploads/property/" + folder
          );
          var base64img = [];

          if (fs.existsSync(file_location)) {
            console.log("Folder found at " + file_location);
            fs.readdirSync(file_location).forEach(file => {
              console.log(file);
              var img = fs.readFileSync(file_location + "/" + file);
              base64img.push(new Buffer(img).toString("base64"));
            });
          } else {
            console.log("No folder found at " + file_location);
          }
          callback(null, JSON.stringify(base64img));
        } else {
          console.log("No property Found");
          callback(err, "No property Found, So no images found");
        }
      }
      console.log(
        "===================Out of the kafka-backend propert photos================="
      );
    });
  }
}

exports.handle_request = handle_request;
