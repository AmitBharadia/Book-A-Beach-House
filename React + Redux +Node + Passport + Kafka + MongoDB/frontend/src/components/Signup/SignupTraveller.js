import React, { Component } from "react";
import axios from "axios";
import "./SignupTraveller.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import { signup } from "../../Actions";
//App Component
class SignupTraveller extends Component {
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
        <input class="form-control" type={type} {...field.input} />
        <div class={{ className }}>{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.signup(values, () => {});
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.redirectFlag) {
      this.props.history.push("/login-traveller");
    }
    this.props.dispatch(change("SignupFormTraveller", "type", "traveller"));
    return (
      <div className="SignupTraveller">
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
                    <a href="http://localhost:3000/login-traveller">Log in</a>
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
                          <div id="">
                            <form
                              onSubmit={handleSubmit(this.onSubmit.bind(this))}
                            >
                              <div class="form-group clearfix">
                                <div class="name name-registration traveler">
                                  <Field
                                    className="form-control  input-lg"
                                    tabindex="1"
                                    label="First Name"
                                    placeholder="First Name"
                                    name="firstName"
                                    type="text"
                                    size="20"
                                    component={this.renderField}
                                  />
                                </div>
                                <div class="name name-registration traveler">
                                  <Field
                                    className="form-control  input-lg"
                                    placeholder="Last name"
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    size="20"
                                    component={this.renderField}
                                  />
                                </div>
                              </div>
                              <div class="form-group">
                                <Field
                                  className="form-control"
                                  placeholder="Enter email"
                                  label="Email Address"
                                  name="emailAddress"
                                  type="email"
                                  size="50"
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
                                value="traveller"
                                className="form-control"
                                component={this.renderField}
                              />

                              <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-block"
                                id="form-submit"
                                tabindex="4"
                                component={this.renderField}
                              >
                                Sign up
                              </button>
                            </form>
                          </div>
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

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.emailAddress) {
    errors.emailAddress = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)
  ) {
    errors.emailAddress = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

//Get the current state of the signup page
const mapStateToProps = state => {
  console.log("Current State : " + JSON.stringify(state.signup.authSignup));
  return {
    redirectFlag: state.signup.authSignup
  };
};

//Export the App component so that it can be used in index.js
export default reduxForm({
  validate,
  form: "SignupFormTraveller"
})(
  connect(
    mapStateToProps,
    { signup }
  )(SignupTraveller)
);
