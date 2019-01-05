var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cors = require("cors");


///Creating server
var app = express();

//Server uses following
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/calculate", (req, res) => {
  console.log("reqest body :", req.body);
  let query = req.body.query;

  output = eval(query);
  console.log("Result : ", output);
  res.json({ queryOutput: output });
  res.end("Operation done successfully");
});

app.get("/", (req, res) => {
  res.send("Welcome");
  console.log("aa");
  res.end();
});
//Server listening to following port
app.listen(3001, () => {
  console.log("Server started on port 3001..");
});
