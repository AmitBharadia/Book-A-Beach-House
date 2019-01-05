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
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
var app = express();


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


app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(3001, () => {
  console.log("Sever started on port 3001 ..");
});
