import React, { Component } from "react";
import axios from "axios";
import "./LoginOwner.css";
import cookie from "react-cookies";

import { Field, reduxForm, change } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authTraveller } from "../../Actions";

//App Component
class LoginOwner extends Component {
  //Define component that you want to render
  renderField(field) {
    //console.log("Field Details : " + JSON.stringify(field));
    const {
      meta: { touched, error },
      type,
      placeholder,
      value
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    console.log("className : " + className);
    return (
      <div class={className}>
        <label>{field.label}</label>
        <input
          class="form-control"
          type={type}
          placeholder={placeholder}
          value={value}
          {...field.input}
        />
        <div class={{ className }}>{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.authTraveller(values);
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.redirectFlag) {
      this.props.history.push("/home");
    }
    this.props.dispatch(change("LoginOwnerForm", "type", "owner"));
    return (
      <div className="LoginOwner">
        <div id="body" class="container-fluid">
          <div id="nav" class="container-fluid border-bottom">
            <nav class="navbar navbar-light">
              <a class="navbar-brand navbar-left" href="#">
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
                    <div class="">
                      <span class="pb-5">Need an account ? </span>
                      <a href="http://18.225.33.155:3000/signup-owner">
                        Sign Up
                      </a>
                    </div>
                    <div class="loginForm border bg-white traveler md-20">
                      <div class="panel-heading">
                        <p class="panel-title border-bottom">Owner login</p>
                        <div class="panel-body col-md-12">
                          <form
                            onSubmit={handleSubmit(this.onSubmit.bind(this))}
                          >
                            <div class="form-group">
                              <Field
                                className="form-control"
                                placeholder="Enter email"
                                label="Email Address"
                                name="username"
                                type="email"
                                component={this.renderField}
                              />
                            </div>

                            <div class="form-group">
                              <Field
                                className="form-control"
                                placeholder="Enter Password"
                                label="Password"
                                name="password"
                                type="password"
                                component={this.renderField}
                              />
                            </div>
                            <Field
                              name="type"
                              type="hidden"
                              value="owner"
                              className="type"
                              component={this.renderField}
                              readOnly
                            />

                            <button
                              type="submit"
                              className="btn btn-primary btn-lg btn-block"
                              id="form-submit"
                              tabindex="4"
                              component={this.renderField}
                            >
                              Log In
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
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

//Get the current state of the login page
const mapStateToProps = state => {
  console.log("Current State : " + JSON.stringify(state.login.authLogin));
  return {
    redirectFlag: state.login.authLogin
  };
};

//Export the App component so that it can be used in index.js
export default reduxForm({
  validate,
  form: "LoginOwnerForm"
})(
  connect(
    mapStateToProps,
    { authTraveller }
  )(withRouter(LoginOwner))
);
