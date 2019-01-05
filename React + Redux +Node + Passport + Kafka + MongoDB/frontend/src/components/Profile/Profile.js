import React, { Component } from "react";
import Navbar from "../Common/Navbar";
import "./Profile.css";
import axios from "axios";
import cookie from "react-cookies";

import { Redirect } from "react-router";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      aboutMe: "",
      country: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
      authFlag: ""
    };
  }

  componentDidMount() {
    this.setState({
      fname: "",
      lname: "",
      aboutMe: "",
      country: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
      authFlag: ""
    });
  }

  onSubmit(e) {
    console.log("Current State: " + this.state);
    var data = {
      first_name: this.state.fname,
      last_name: this.state.lname,
      aboutMe: this.state.aboutMe,
      country: this.state.country,
      company: this.state.company,
      school: this.state.school,
      hometown: this.state.hometown,
      languages: this.state.languages,
      gender: this.state.gender
    };

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/add-profile", data).then(response => {
      console.log("Status Code : ", response.status);
      console.log("Response data : ", response.data);
      if (response.status == 200) {
        if (response.data.auth) {
          this.setState({
            authFlag: "pass"
          });
        } else {
          this.setState({
            authFlag: "fail"
          });
        }
      }
    });
  }

  render() {
    var redirect = null;

    if (this.state.authFlag == "pass" || !cookie.load("cookie")) {
      redirect = <Redirect to="/home" />;
    }

    return (
      <div className="Profile">
        {redirect}
        <Navbar />
        <ul class="nav nopadding border-bottom">
          <li class="pl-5 ml-5 nav-item">
            <a class="nav-link active" href="#">
              Profile
            </a>
          </li>
          <li class="pl-5 nav-item">
            <a class="nav-link" href="#" />
          </li>
        </ul>

        <div class="row nopadding border">
          <div class="col-2 nopadding border" />
          <div class="col-6 nopadding border">
            <h4 class="pt-3 pl-3">Profile Information</h4>

            <form>
              <div class="row nopadding h-100">
                <div class="mb-2 ml-3 ">
                  <input
                    type="text"
                    class="form-control col-xs-8"
                    id="firstname"
                    aria-describedby="emailHelp"
                    placeholder="First name"
                    onChange={e => {
                      console.log(e.target.value);
                      this.setState({
                        fname: e.target.value
                      });
                    }}
                  />
                </div>
              </div>

              <div class="row nopadding ">
                <div class="mb-2 ml-3 h-50">
                  <input
                    type="text"
                    class="form-control col-xs-8 "
                    id="lastname"
                    aria-describedby="emailHelp"
                    placeholder="Last name"
                    onChange={e => {
                      console.log(e.target.value);
                      this.setState({
                        lname: e.target.value
                      });
                    }}
                  />
                </div>
              </div>

              <div class="mb-2 ml-3 mr-3">
                <textarea
                  class="form-control"
                  aria-describedby="emailHelp"
                  row="2"
                  placeholder="About Me"
                  onChange={e => {
                    console.log(e.target.value);
                    this.setState({
                      aboutMe: e.target.value
                    });
                  }}
                />
              </div>

              <div class="row nopadding ">
                <div class="mb-2 ml-3 h-50">
                  <input
                    type="text"
                    class="form-control col-xs-8 "
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="My city, country"
                    onChange={e => {
                      console.log(e.target.value);
                      this.setState({
                        country: e.target.value
                      });
                    }}
                  />
                </div>
              </div>

              <div class="row nopadding ">
                <div class="mb-2 ml-3 h-50">
                  <input
                    type="text"
                    class="form-control col-xs-8 "
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Company"
                    onChange={e => {
                      console.log(e.target.value);
                      this.setState({
                        company: e.target.value
                      });
                    }}
                  />
                </div>
              </div>

              <div class="row nopadding ">
                <div class="mb-2 ml-3 h-50">
                  <input
                    type="text"
                    class="form-control col-xs-8 "
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="School"
                    onChange={e => {
                      console.log(e.target.value);
                      this.setState({
                        school: e.target.value
                      });
                    }}
                  />
                </div>
              </div>

              <div class="row nopadding ">
                <div class="mb-2 ml-3 mt-1">
                  <input
                    type="text"
                    class="form-control col-xs-8 "
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="HomeTown"
                    onChange={e => {
                      console.log(e.target.value);
                      this.setState({
                        hometown: e.target.value
                      });
                    }}
                  />
                </div>
              </div>

              <div class="row nopadding ">
                <div class="ml-3 mb-4 mt-1">
                  <input
                    type="text"
                    class="form-control "
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Languages"
                    onChange={e => {
                      console.log(e.target.value);
                      this.setState({
                        languages: e.target.value
                      });
                    }}
                  />
                </div>
              </div>
              <div class="row nopadding">
                <select
                  class="form-control  mb-3 col-xs-8 ml-3 mr-3"
                  onChange={e => {
                    console.log(e.target.value);
                    this.setState({
                      gender: e.target.value
                    });
                  }}
                >
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </form>
            <button
              type="submit"
              class="btn btn-info ml-3"
              onClick={e => this.onSubmit(e)}
            >
              Save Changes
            </button>
          </div>

          <div class="col-3 nopadding border" />
        </div>
      </div>
    );
  }
}

export default Profile;
