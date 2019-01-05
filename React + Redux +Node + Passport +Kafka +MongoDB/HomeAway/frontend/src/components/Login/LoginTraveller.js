import React, { Component } from "react";
import axios from "axios";
import "./LoginTraveller.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { loginMutation } from "../../mutation";
import { loginQuery } from "../../queries";
import { compose, graphql, withApollo } from "react-apollo";

//App Component
class LoginTraveller extends Component {
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
      this.props.client
        .mutate({
          mutation: loginMutation,
          variables: {
            email_address: this.state.username,
            password: this.state.password,
            type: "traveller"
          }
        })
        .then(res => {
          alert("Response" + JSON.stringify(res));
          console.log("Data: " + JSON.stringify(res.data));
          if(res.data.login.id){
            const {id,first_name}= res.data.login;
            cookie.save("cookie",id);
            cookie.save("name", first_name);
            this.setState({
              authFlag:"pass"
            })
          }
        });
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
      <div className="LoginTraveller">
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
                <h1 class="hidden-xs">Log in to HomeAway</h1>
                <div class="footer text-footer text-center traveler">
                  <div class="">
                    <span>Need an account ? </span>
                    <a
                      href="#"
                      onClick={() => {
                        this.setState({ routeToSignup: true });
                      }}
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
              <div class="login-wrapper panel panel-dashboard pr-50">
                <div class="login-form border bg-white traveler md-20 pb-30">
                  <div class="panel-heading">
                    <p class="panel-title border-bottom">Account login</p>
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
    );
  }
}
export default graphql(loginMutation)(withApollo(LoginTraveller));
