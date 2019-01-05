import React, { Component } from "react";
import axios from "axios";
import "./SignupTraveller.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";
//App Component
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      authFlag: "new",
      routeToLogin: false,
      showSwitch: false
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: "new",
      routeToLogin: false
    });
  }

  submitHandler() {
    //prevent page from refresh
    if (this.state.showSwitch) {
      console.log("state:" + this.state);
      if (
        this.state.firstName == "" ||
        this.state.password == "" ||
        this.state.lastName == "" ||
        this.emailId == ""
      ) {
        alert("firstName,LastName,emailID and Password cannot be empty");
      } else {
        const data = {
          firstName: this.state.firstName,
          lastName: this.state.password,
          emailAddress: this.state.emailId,
          password: this.state.password,
          type:"traveller"
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios
          .post("http://localhost:3001/signup-traveller", data)
          .then(response => {
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
            } else {
              this.setState({
                authFlag: "new"
              });
            }
          });

        console.log("After login :", this.state);
      }
    } else {
      this.setState({ showSwitch: true });
    }
  }
  render() {
    let redirectVar = null;
    if (this.state.authFlag == "pass" || this.state.routeToLogin) {
      redirectVar = <Redirect to="/login-traveller" />;
    }
    if (this.state.routeToSignup) {
      redirectVar = <Redirect to="/login-traveller" />;
    }
    return (
      <div className="LoginTraveller">
        {redirectVar}
        <div id="body" className="container-fluid">
          <div id="nav" class="container-fluid border-bottom">
            <nav class="navbar navbar-light">
              <a class="  navbar-brand navbar-left" href="#">
                <img
                  class="pl-5"
                  src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"
                />
              </a>
              <div class="navbar-brand ml-auto">
                <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
              </div>
            </nav>
          </div>
          <div id="container" class="container-fluid">
            <div id="login-container">
              <div class="login-header text-center col-md-20 traveler">
                <h1 class="hidden-xs">Sign up for Homeaway</h1>
                <div class="footer text-footer text-center traveler">
                  <div class="">
                    <span>Already have an account ? </span>
                    <a
                      href="#"
                      onClick={() => {
                        this.setState({ routeToLogin: true });
                      }}
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
              <div class="login-wrapper panel panel-dashboard">
                <div class="login-form border bg-white traveler md-20 pb-30">
                  <div class="panel-heading">
                    <p class="panel-title border-bottom" />
                    <div class="panel-body col-md-12">
                      <form class="mt-5">
                        <div id="createAccountFields" class="">
                          {this.state.showSwitch && (
                            <div id="">
                              <div class="form-group clearfix">
                                <div class="name name-registration traveler">
                                  <label class="hidden">First name</label>
                                  <input
                                    id="firstName"
                                    name="firstName"
                                    class="form-control input-lg"
                                    tabindex="1"
                                    placeholder="First Name"
                                    type="text"
                                    size="20"
                                    onChange={e => {
                                      this.setState({
                                        firstName: e.target.value
                                      });
                                    }}
                                    autocomplete="on"
                                  />
                                </div>
                                <div class="name name-registration traveler">
                                  <label class="hidden">Last Name</label>
                                  <input
                                    id="lastName"
                                    name="lastName"
                                    class="form-control input-lg"
                                    tabindex="2"
                                    placeholder="Last Name"
                                    type="text"
                                    size="20"
                                    autocomplete="on"
                                    onChange={e => {
                                      this.setState({
                                        lastName: e.target.value
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="form-group">
                                <label class="hidden">Email Address</label>
                                <input
                                  id="emailAddress"
                                  name="emailAddress"
                                  class="form-control input-lg"
                                  tabindex="3"
                                  placeholder="Email address"
                                  type="email"
                                  size="20"
                                  autocomplete="on"
                                  onChange={e => {
                                    this.setState({
                                      emailId: e.target.value
                                    });
                                  }}
                                />
                              </div>
                              <div class="form-group">
                                <label class="hidden">Password</label>
                                <input
                                  id="password"
                                  name="password"
                                  class="form-control input-lg"
                                  tabindex="4"
                                  placeholder="Password"
                                  type="password"
                                  size="20"
                                  autocomplete="off"
                                  onChange={e => {
                                    this.setState({
                                      password: e.target.value
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          <input
                            tabindex="6"
                            type="button"
                            class="btn btn-primary btn-lg btn-block btn-cas-primary"
                            value="Sign Me Up"
                            onClick={this.submitHandler}
                            id="form-submit"
                          />
                        </div>

                        <div class="hr-text text-center mb-5  ">
                          <span class="text-center">
                            <br />
                            <br />
                            <em>or</em>
                          </span>
                        </div>
                        <button
                          tabindex="7"
                          class="third-party-login-button fb-button traveler"
                        >
                          <div class="login-button-text ">
                            <span class="logo">
                              <i
                                class="icon-facebook icon-white pull-left"
                                aria-hidden="true"
                              />
                            </span>
                            <span class="text text-center pull-right">
                              Log in with Facebook
                            </span>
                          </div>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//Export the App component so that it can be used in index.js
export default Signup;
