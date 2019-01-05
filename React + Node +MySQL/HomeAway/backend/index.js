var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var multer = require("multer");
var cors = require("cors");
var fs = require("fs");
var query = require("./query");
var mkdir = require("mkdirp");
var bcrypt = require("bcryptjs");
var path = require("path");
var app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var purpose = req.body.file_upload_purpose;
    var path = "";
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

//hashing and password
var salt = bcrypt.genSaltSync(10);

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

app.get("/", (req, res) => {
  console.log("In the rest request home");
  res.setHeader(200, {
    "Content-Type": "text/json"
  });
  res.send("");
});

app.post("/signup-traveller", (req, res) => {
  console.log("In the rest request signup traveller");
  console.log("Request body:" + JSON.stringify(req.body));

  req.body.password = bcrypt.hashSync(req.body.password, salt);

  //query Database
  query.addUser(req.body, err => {
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

app.post("/add-property", upload.array("files", 5), (req, res) => {
  console.log("In the add property request ");
  var userId = req.session.userId;
  var type = req.session.type;
  console.log("Session data " + userId);
  var body = req.body;

  console.log("List of files :" + req.files);
  console.log("Request body:" + JSON.stringify(req.body));
  //query Database
  if (req.files.length > 0) {
    var filepath = req.files[0].path;
    console.log("Filepath:" + filepath);
    var img_src = filepath.substring(0, filepath.lastIndexOf("\\"));
    body.img_src = img_src;
    console.log("Property location :" + body.img_src);
  }
  body.user_id = userId;
  console.log("************************************");

  query.addProperty(body, err => {
    if (err) {
      res.cookie("cookie", req.body.type, {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
      res.cookie("name", req.body.username, {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
      res.end("Error occured");
      res.json({ auth: true });
    } else {
      res.json({ auth: true });
      res.end("added property successfull");
    }
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

app.post("/book-property", (req, res) => {
  console.log("In the book property request : ");
  console.log("Request body:" + JSON.stringify(req.body));
  var userId = req.session.userId;
  console.log("session data " + userId);
  var body = req.body;
  body.user_id = userId;
  var type = req.session.type;
  //query Database
  query.bookProperty(body, err => {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error occured");
    } else {
      res.cookie("cookie", type, {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
      res.json({ auth: true });
      res.end("Booking successfull");
    }
  });
});

app.post("/login-traveller", (req, res) => {
  console.log("In the rest request login-traveller");
  console.log("Request Body : ", req.body);

  //Check if a valid user
  let auth = query.isValidUser(
    req.body.username,
    req.body.password,
    req.body.type,
    (err, isValid) => {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error occured");
      } else {
        if (isValid) {
          console.log("It is a valid user");
          res.cookie("cookie", req.body.type, {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          res.cookie("name", req.body.username, {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });

          req.session.userId = isValid;
          var sessData = req.session;
          sessData.userId = isValid;
          sessData.type = req.body.type;
          // console.log("session data : " + JSON.stringify(req.session));

          res.json({ auth: true });
          res.end("Successful Login");
        } else {
          console.log("Not a valid user");
          res.json({ auth: false });
          res.end("Not a successful Login");
        }
      }
    }
  );
});

app.get("/search", (req, res) => {
  console.log("Inside rest api search");
  console.log("Request query : " + JSON.stringify(req.query));
  var userId = req.session.userId;
  var type = req.session.type;
  console.log("session data " + userId);
  //Do validation

  query.search(req.query, (err, data) => {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error occured");
    } else {
      if (data) {
        res.cookie("cookie", type, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        res.json({ result: data });
        res.end("Successful retrieval of property");
      } else {
        console.log("Not a available property");
        res.json({ auth: false });
        res.end("Not available at this location");
      }
    }
  });
});

app.get("/trip-history", (req, res) => {
  console.log("Inside rest api trip-history");
  console.log("Request: " + JSON.stringify(req.body));
  var userId = req.session.userId;
  var type = req.session.type;
  console.log("session data " + userId);
  //Do validation
  query.findTripHisory(userId, (err, data) => {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error occured");
    } else {
      if (data) {
        res.cookie("cookie", type, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        res.json({ result: data });
        res.end("Successful history details");
      } else {
        console.log("Not a valid user");
        res.json({ auth: false });
        res.end("Not a successful findTripHisory");
      }
    }
  });
});

app.get("/get-property-photos/", (req, res) => {
  console.log("Inside rest api get-property-photos");
  console.log("Request query : " + JSON.stringify(req.query));
  var folder = req.query.location + "_" + req.query.headline;
  var file_location = path.join(__dirname + "/uploads/property/" + folder);
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
});

app.listen(3001, () => {
  console.log("Sever started on port 3001 ..");
});