var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var multer = require("multer");
var cors = require("cors");
var fs = require("fs");
var query = require("./query");
var mkdir = require("mkdirp");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var path = require("path");
var app = express();
var config = require("./config/settings");

var kafka = require("./kafka/client");

//Mongo DB related imports
var { User } = require("./models/User");
var { Property } = require("./models/Property");
var { Trip } = require("./models/Trip");
var ObjectID = require("mongodb").ObjectID;

//hashing and password
var salt = bcrypt.genSaltSync(10);

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require("./config/passport")(passport);

//Allows request from other origin an access
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273_project_homeaway",
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());

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

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var purpose = req.body.file_upload_purpose;
    var path = "";
    //console.log("Purpose :"+JSON.stringify(req.body));
    if (purpose == "property") {
      path =
        "./uploads/" +
        purpose +
        "/" +
        req.body.location +
        "_" +
        req.body.headline +
        "/";
    } else if (purpose == "profile") {
      path = "./uploads/" + purpose + "/" + req.session.userId + "/";
    }
    mkdir(path, function(err) {
      if (err) {
        console.log("Error while creating new directory", err);
        cb(err);
      } else {
        console.log("Successully added new file at ", path);
        cb(null, path);
      }
    });
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });

//set up middleware for authentication
var requireAuth = passport.authenticate("jwt", { session: false });

app.get("/", (req, res) => {
  console.log("In the rest request home");
  res.setHeader(200, {
    "Content-Type": "text/json"
  });
  res.send("");
});

app.post("/signup-traveller", function(req, res) {
  console.log("In the rest request signup traveller");
  console.log(
    "============================In the rest request signup====================="
  );
  console.log("Request body:" + JSON.stringify(req.body));
  kafka.make_request("post_signup", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        auth: results
      });

      res.end();
    }
    console.log(
      "============================Out of the rest request signup====================="
    );
  });
});

app.post("/add-property", requireAuth, upload.array("files", 5), (req, res) => {
  //app.post("/add-property", upload.array("files", 5), (req, res) => {
  console.log(
    "============================In of the rest request add property ====================="
  );
  console.log("Request body:" + JSON.stringify(req.body));
  console.log("List of files :" + req.files);

  //Fetch the sesion data
  var userId = req.session.userId;
  var type = req.session.type;

  console.log("Session data => userId :" + userId + " type : " + type);

  var body = req.body;
  //If any file uploaded, find the src location
  if (req.files && req.files.length > 0) {
    var filepath = req.files[0].path;
    console.log("Filepath:" + filepath);
    var img_src = filepath.substring(0, filepath.lastIndexOf("\\"));
    body.img_src = img_src;
    console.log("Property location :" + body.img_src);
  }
  body.userID = userId;

  kafka.make_request("post_property", req.body, function(err, results) {
    console.log("in result");
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        auth: results
      });
      res.end();
    }
    console.log(
      "============================Out of the rest request signup====================="
    );
  });
});

app.post("/add-profile", (req, res) => {
  console.log("In the add profile request ");
  console.log("Request body:" + JSON.stringify(req.body));
  var userId = req.session.userId;
  console.log("session data " + userId);
  var body = req.body;
  body.owner_id = userId;
  //query Database
  query.addProfile(body, err => {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error occured");
    } else {
      res.json({ auth: true });
      res.end("Signup successfull");
    }
  });
});

app.post("/book-property", requireAuth, (req, res) => {
  //app.post("/book-property", (req, res) => {
  console.log(
    "============================In the book property request ====================="
  );
  console.log("Request body:" + JSON.stringify(req.body));

  var userId = req.session.userId;
  var type = req.session.type;
  console.log("session data =>" + JSON.stringify(req.session));
  var body = req.body;

  var body = req.body;
  body.userId = userId;
  kafka.make_request("post_book_trip", body, function(err, auth) {
    console.log("in result");
    console.log(auth);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({ auth: auth });
    }
    res.end();
    console.log(
      "============================Out of the rest request book property====================="
    );
  });
});

app.post("/login-traveller", (req, res) => {
  console.log(
    "============================In the rest request login====================="
  );
  console.log("Request Body : ", req.body);
    
  kafka.make_request("post_login", req.body, function(err, user) {
    console.log("in result");
    console.log(user);
    if (err || !user) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (user) {
        console.log("Inside else");
        var token = jwt.sign({ _id: user._id }, config.secret, {
          expiresIn: 10080 // in seconds
        });

        console.log("Token :", token);
        //Set cookie for type of user: traveller/ owner
        //Note :: Make this user.personal_details.type
        res.cookie("cookie", user.type, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });

        // set cookie for name of user
        //Note :: Make this user.personal_details.first_name
        res.cookie("name", user.first_name, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });

        //set session data userID and
        var sessData = req.session;

        sessData.userId = user._id;
        sessData.type = user.type;
        sessData.name = user.first_name;

        res.json({ auth: true, token: "JWT " + token });
        res.end("Successful Login");
      }
    }
    console.log(
      "============================Out of the rest request login====================="
    );
  });
});

app.get("/search", requireAuth, (req, res) => {
  //app.get("/search", (req, res) => {
  console.log("===================In rest request search API=================");
  //Request param
  console.log("Request query : " + JSON.stringify(req.query));

  //Fetch the sesion data
  var userId = req.session.userId;
  var type = req.session.type;
  console.log("Session data => userId :" + userId + " type : " + type);

  kafka.make_request("get_search", req.query, function(err, property) {
    console.log("in result");
    console.log(property);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json(property);
    }
    res.end();
    console.log(
      "============================Out of the rest request search API====================="
    );
  });
});

app.get("/trip-history", requireAuth, (req, res) => {
  //app.get("/trip-history", (req, res) => {
  console.log(
    "===================In rest request trip-history API================="
  );
  console.log("Request: " + JSON.stringify(req.body));
  var userId = req.session.userId;
  console.log("session data " + userId);
  kafka.make_request("get_trips", userId, function(err, trips) {
    console.log("in result");
    console.log(trips);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json(trips);
    }
    res.end();
    console.log(
      "=================Out of the rest request trip history API====================="
    );
  });
});

app.get("/get-property-photos", requireAuth, (req, res) => {
  //app.get("/get-property-photos", (req, res) => {
  console.log(
    "===================In rest request for get-property-photos API================="
  );
  console.log("Request query : " + JSON.stringify(req.query));

  var userId = req.session.userId;
  var type = req.session.type;
  console.log("session data =>" + JSON.stringify(req.session));

  if (req.query._id) {
    Property.findOne({ _id: ObjectID(req.query._id) }, (err, property) => {
      if (err) {
        console.log("Error Occured ", err);
        res.end("Error Ocurred");
      } else {
        if (property) {
          console.log();
          var folder = property.location + "_" + property.headline;
          var file_location = path.join(
            __dirname + "/uploads/property/" + folder
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

          res.writeHead(200, { "Content-Type": "image/jpg" });
          res.end(JSON.stringify(base64img));
        } else {
          console.log("No property Found");
          res.end("No property Found, So no images found");
        }
      }
      console.log(
        "===================Out of the rest request for get-property-photos API================="
      );
    });
  }
});

app.listen(3001, () => {
  console.log("Sever started on port 3001 ..");
});
