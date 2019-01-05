var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
var Signup = require("./services/signup.js");
var Login = require("./services/login.js");
var Search = require("./services/search");
var Trips = require("./services/trips");
var BookTrips = require("./services/bookTrip");
var PropertyPhotos = require("./services/propertyPhotos");
var AddProperty = require("./services/addProperty");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book", Books);
handleTopicRequest("post_signup", Signup);
handleTopicRequest("post_login", Login);
handleTopicRequest("get_search", Search);
handleTopicRequest("get_trips", Trips);
handleTopicRequest("post_book_trip", BookTrips);
handleTopicRequest("get_property_photos", PropertyPhotos);
handleTopicRequest("post_property", AddProperty);
