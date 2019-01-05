import React, { Component } from "react";
import axios from "axios";
import "./LoginTraveller.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import { Field, reduxForm, change } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authTraveller } from "../../Actions";

//App Component
class LoginTraveller extends Component {
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
    console.log("value : " + value);
    return (
      <div class={className}>
        <label>{field.label}</label>
        <input
          class="form-control"
          type={type}
          value={value}
          placeholder={placeholder}
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

    if (this.props.authLogin) {
      console.log(
        "Props for Authentication of login page :",
        this.props.authLogin
      );
      this.props.history.push("/home");
    }
    this.props.dispatch(change("LoginFormTraveller", "type", "traveller"));
    return (
      <div className="LoginTraveller">
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
                    <a href="http://localhost:3000/signup-traveller">Sign Up</a>
                  </div>
                </div>
              </div>
              <div class="login-wrapper panel panel-dashboard">
                <div class="login-form border bg-white traveler md-20 pb-30">
                  <div class="panel-heading">
                    <p class="panel-title border-bottom">Account login</p>
                    <div class="panel-body col-md-12">
                      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

//Get the current state of the signup page
const mapStateToProps = state => {
  console.log("Current State : " + JSON.stringify(state.login.authLogin));
  return {
    authLogin: state.login.authLogin
  };
};

export default reduxForm({
  validate,
  form: "LoginFormTraveller"
})(
  connect(
    mapStateToProps,
    { authTraveller }
  )(withRouter(LoginTraveller))
);
