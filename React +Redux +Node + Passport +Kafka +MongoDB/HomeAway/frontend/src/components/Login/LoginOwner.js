import React, { Component } from "react";
import axios from "axios";
import "./LoginOwner.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";
//App Component
class LoginOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authFlag: "new",
      routeToSignup: false
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: "new",
      routeToSignup: false
    });
  }

  usernameChangeHandler(e) {
    console.log(e.target.value);
    this.setState({
      username: e.target.value
    });
  }

  passwordChangeHandler(e) {
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
  }

  submitHandler = e => {
    //prevent page from refresh
    e.preventDefault();
    if (this.state.username == "" || this.state.password == "") {
      alert("Usernmae and Password cannot be empty");
    } else {
      const data = {
        username: this.state.username,
        password: this.state.password,
        type: "owner"
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post("http://localhost:3001/login-traveller", data)
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
  };
  render() {
    let redirectVar = null;
    if (this.state.authFlag == "pass" || cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }

    if (this.state.routeToSignup) {
      redirectVar = <Redirect to="/signup-traveller" />;
    }

    return (
      <div className="LoginOwner">
        {redirectVar}
        <div id="body" class="container-fluid">
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
                <div class="footer text-footer text-center traveler">
                  <div class="">
                    <a
                      href="#"
                      onClick={() => {
                        this.setState({ routeToSignup: true });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col  col-md-5 ">
                  <img
                    id="personyzeContent"
                    src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"
                  />
                </div>
                <div class="col col-md-6 ">
                  <div class="login-wrapper">
                    <div class="loginForm border bg-white traveler md-20">
                      <div class="panel-heading">
                        <p class="panel-title border-bottom">Owner login</p>
                        <div class="panel-body col-md-12">
                          <form class="  ">
                            <div class="form-group">
                              <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                onChange={this.usernameChangeHandler}
                              />
                            </div>

                            <div class="form-group">
                              <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                onChange={this.passwordChangeHandler}
                              />
                            </div>
                            <input
                              type="button"
                              class="btn btn-primary btn-lg btn-block"
                              value="Log In"
                              id="form-submit"
                              tabindex="4"
                              onClick={this.submitHandler}
                            />
                          </form>
                        </div>
                      </div>
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
export default LoginOwner;
