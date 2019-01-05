var mysql = require("mysql");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

var pool = mysql.createPool({
  connectionLimit: 1000,
  host: "localhost",
  user: "root",
  password: "",
  database: "homeaway"
});

function executeQuery(queryString, callback) {
  console.log("Query: " + queryString);
  pool.getConnection((err, con) => {
    if (err) {
      console.log("Error occurred while executing query", err);
      return callback("Error occured");
    } else {
      pool.query(queryString, (err, rows) => {
        if (err) {
          console.log("Error occurred while executing query ", err);
          return callback("Error occured");
        } else {
          return callback(null, rows);
        }
      });
    }
  });
}

var isValidUser = (username, password, type, callback) => {
  let queryString =
    "select * from user where email_address= " +
    mysql.escape(username) +
    " and type = " +
    mysql.escape(type);
  console.log(queryString);
  executeQuery(queryString, (err, rows) => {
    if (err) {
      console.log("Error occurred while verifying user login credentials", err);
      return callback("Error occured");
    } else {
      console.log("result:" + JSON.stringify(rows));
      if (rows[0] && rows[0].id) {
        console.log("ID: " + rows[0]);
        console.log("expected password: " + rows[0].password);
        console.log("actual password: " + password);
        if (bcrypt.compareSync(password, rows[0].password)) {
          console.log("password matched");
          return callback(null, rows[0].id);
        } else {
          console.log("password did not match");
          return callback(null, null);
        }
      } else {
        return callback(null, false);
      }
    }
  });
};

var addUser = (userDetails, callback) => {
  let queryString =
    "Insert into user(first_name,last_name,email_address,password,type) values ( " +
    mysql.escape(userDetails.firstName) +
    " , " +
    mysql.escape(userDetails.lastName) +
    " , " +
    mysql.escape(userDetails.emailAddress) +
    " , " +
    mysql.escape(userDetails.password) +
    " , " +
    mysql.escape(userDetails.type) +
    ")";
  executeQuery(queryString, err => {
    if (err) {
      console.log("Error occurred while verifying user login credentials", err);
      return callback("Error occured");
    } else {
      return callback(null, true);
    }
  });
};

var bookProperty = (bookDetails, callback) => {
  let queryString =
    "INSERT INTO booking (user_id,property_id,from_date,to_date,guests) VALUES( " +
    mysql.escape(bookDetails.user_id) +
    " , " +
    mysql.escape(bookDetails.property_id) +
    ", " +
    mysql.escape(bookDetails.fm) +
    " , " +
    mysql.escape(bookDetails.to) +
    " , " +
    mysql.escape(bookDetails.guests) +
    ")";

  executeQuery(queryString, err => {
    if (err) {
      console.log("************************************************");
      console.log("Error occurred while booking property details", err);
      console.log("************************************************");

      return callback("Error occured");
    } else {
      return callback(null, true);
    }
  });
};

var findTripHisory = (user_id, callback) => {
  var queryString =
    "SELECT * FROM trip_history WHERE user_id =" + mysql.escape(user_id);

  executeQuery(queryString, (err, rows) => {
    if (err) {
      console.log("Error occurred while checking user book history ", err);
      return callback("Error occured");
    } else {
      console.log(JSON.stringify(rows));
      return callback(null, rows);
    }
  });
};

var search = (searchObj, callback) => {
  let location =
    searchObj.location == null ? "" : searchObj.location.toUpperCase();
  let guests = searchObj.guests == null ? "" : searchObj.guests;
  let queryString =
    "SELECT *  from property_details where upper(location) LIKE '%" +
    location +
    "%'  and max_guests >= " +
    mysql.escape(guests) +
    " ";

  if (searchObj.available_from) {
    queryString +=
      " and available_from<=" + mysql.escape(searchObj.available_from);
  }

  if (searchObj.available_to) {
    queryString += " and available_to>=" + mysql.escape(searchObj.available_to);
  }
  executeQuery(queryString, (err, rows) => {
    if (err) {
      console.log("Error occurred while searching property", err);
      return callback("Error occured");
    } else {
      console.log(JSON.stringify(rows));
      return callback(null, rows);
    }
  });
};

var addProfile = (req, callback) => {
  let queryString =
    "UPDATE user SET " +
    "first_name=" +
    mysql.escape(req.first_name) +
    ", last_name=" +
    mysql.escape(req.last_name) +
    ", aboutMe=" +
    mysql.escape(req.aboutMe) +
    ", country=" +
    mysql.escape(req.country) +
    ", company=" +
    mysql.escape(req.company) +
    ", school=" +
    mysql.escape(req.school) +
    ", languages=" +
    mysql.escape(req.languages) +
    ", hometown=" +
    mysql.escape(req.hometown) +
    ", gender=" +
    mysql.escape(req.gender) +
    " where id=" +
    mysql.escape(req.id);

  executeQuery(queryString, err => {
    if (err) {
      console.log("**************************************************");
      console.log("Error occurred while adding new profile ", err);
      console.log("**************************************************");
      return callback("Error occured");
    } else {
      return callback(null, true);
    }
  });
};

var addProperty = (propDetails, callback) => {
  console.log("propDetails : " + JSON.stringify(propDetails));
  let queryString =
    "Insert into property_details(available_from,available_to,max_guests,price,bedrooms,bathrooms,sqft,image_src, location, amenities, headline,description,type,owner_id) values(" +
    mysql.escape(propDetails.available_from) +
    " , " +
    mysql.escape(propDetails.available_to) +
    " , " +
    mysql.escape(propDetails.max_guests) +
    " , " +
    mysql.escape(propDetails.price) +
    " , " +
    mysql.escape(propDetails.bedrooms) +
    " , " +
    mysql.escape(propDetails.bathrooms) +
    " , " +
    mysql.escape(propDetails.sqft) +
    " , " +
    mysql.escape(propDetails.img_src) +
    " , " +
    mysql.escape(propDetails.location) +
    " , " +
    mysql.escape(propDetails.amenities) +
    " , " +
    mysql.escape(propDetails.headline) +
    " , " +
    mysql.escape(propDetails.description) +
    " , " +
    mysql.escape(propDetails.type) +
    " , " +
    mysql.escape(propDetails.user_id) +
    ")";

  executeQuery(queryString, err => {
    if (err) {
      console.log("Error occurred while adding new property ", err);
      return callback("Error occured");
    } else {
      return callback(null, true);
    }
  });
};

module.exports = {
  isValidUser,
  addUser,
  search,
  addProperty,
  addProfile,
  bookProperty,
  findTripHisory
};
