"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var { User } = require("./../models/User");
var config = require("./settings");
var ObjectID = require("mongodb").ObjectID;

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
  };

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      console.log("=======================Authenticating====================");
      console.log("payload: ", JSON.stringify(jwt_payload));
      User.find({ _id: ObjectID(jwt_payload._id) }, function(err, user) {
        if (!err) {
          console.log("JWT payload :", JSON.stringify(jwt_payload));
          console.log("user " + JSON.stringify(user));
          delete user.password;
          console.log(
            "====================Authenticating Successfull=========="
          );
          callback(null, user);
        } else {
          console.log("Error occured while validating token ", err);
        }
      });
    })
  );
};
