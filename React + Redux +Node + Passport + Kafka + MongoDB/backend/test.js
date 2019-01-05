var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

//Unit Test begin
describe("HomeAway", function() {
  describe("Test REST  requests", function() {
    //GET request Search page
    it("should return provide valid search results", function(done) {
      server
        .get("/search")
        .query({ location: "mumbai", guests: 4 })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
          console.log("Status: ", res.status);
          res.status.should.equal(200);
          done();
        });
    });

    //Get Request all trips
    it("should return provide valid trip history results", function(done) {
      server
        .get("/trip-history")
        .set("Cookie", "userId=1;type=traveller")
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
          console.log("Status: ", res.status);
          res.status.should.equal(200);
          done();
        });
    });

    //Post Request for login
    it("should return provide validate login request", function(done) {
      server
        .post("/login-traveller")
        .send({ username: "admin", password: "pass" })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
          console.log("Status: ", res.status);
          res.status.should.equal(200);
          done();
        });
    });

    //Post Request for signup
    it("should add new user to db", function(done) {
      server
        .post("/signup-traveller")
        .send({
          firstName: "test-user",
          lastName: "no surname",
          emailAddress: "test",
          password: "pass",
          type: "traveller"
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
          console.log("Status: ", res.status);
          res.status.should.equal(200);
          done();
        });
    });

    //Post Request for booking a property
    it("should add new booking", function(done) {
      server
        .post("/book-property")
        .send({
          fm: "2018-06-16",
          to: "2018-06-15",
          guests: "1",
          property_id: "6"
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
          console.log("Status: ", res.status);
          res.status.should.equal(200);
          done();
        });
    });
  });
});
