import React, { Component } from "react";
import cookie from "react-cookies";
import { withRouter } from "react-router";

import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchTripHistory, searchProperty } from "./../../Actions";
import "./Home.css";
//App Component
class Home extends Component {
  componentDidMount() {
    this.props.fetchTripHistory();
  }
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
    this.props.searchProperty(values);
  }

  render() {
    console.log("Redirect to  ", this.props.redirectVal);

    if (this.props.redirectVal == "propertyList") {
      this.props.history.push("/property-list");
    }

    console.log("Trips: " + this.props.tripDetails);
    var tripHistory = this.props.tripDetails;

    if (tripHistory) {
      var pastTrips = tripHistory.map(item => {
        console.log(tripHistory.length);
        return (
          <div class="w-50 ml-5">
            <br />
            <div
              class="card mt-3 "
              onClick={e => {
                this.setState({
                  propertyDetails: item
                });
              }}
            >
              <div class="row nopadding">
                <div class="col-5 nopadding ">
                  <img
                    class="img-responsive"
                    src="http://www.gstatic.com/webp/gallery/2.jpg"
                  />
                </div>
                <div class="card-list col-6 ">
                  <div class="card-block nopadding ">
                    <h4 class="card-title ">
                      {item.headline} At {item.location}
                    </h4>
                    <p class="card-text">
                      <h5>
                        From: {item.from} To : {item.to}
                      </h5>
                      <br />
                      <h5 class="m-auto"> Guests : {item.guests} </h5>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    const { handleSubmit } = this.props;
    //const { guests } = this.props.formParam;
    return (
      <div className="Home">
        <div class="HeroImage ">
          <div class="HeroImage__content ">
            <div class="HeroImage_effects">
              <nav class="navbar navbar-expand-lg navbar-light mr">
                <a class="navbar-brand" href="#">
                  <img
                    class="pl-5 img-responsive"
                    src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"
                  />
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon" />
                </button>
                <div
                  class="collapse navbar-collapse "
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav">
                    <li class="nav-item active">
                      <a class="nav-link text-white" href="#">
                        Trip boards <span class="sr-only">(current)</span>
                      </a>
                    </li>

                    {!cookie.load("cookie") && (
                      <li class="nav-item dropdown text-light pl-5">
                        <a
                          class="nav-link dropdown-toggle text-white"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Login
                        </a>
                        <div
                          class="dropdown-menu text-white "
                          aria-labelledby="navbarDropdown"
                        >
                          <a
                            class="dropdown-item text-primary pt-3"
                            href="http://localhost:3000/login-traveller"
                          >
                            Traveller Login
                          </a>
                          <a
                            class="dropdown-item text-primary pt-4"
                            href="http://localhost:3000/login-owner"
                          >
                            Owner Login
                          </a>
                        </div>
                      </li>
                    )}

                    {cookie.load("cookie") && (
                      <li class="nav-item dropdown text-light pl-5">
                        <a
                          class="nav-link dropdown-toggle text-white"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {cookie.load("name")}
                        </a>
                        <div
                          class="dropdown-menu text-white "
                          aria-labelledby="navbarDropdown"
                        >
                          <a class="dropdown-item text-primary pt-3" href="#">
                            Inbox
                          </a>
                          <a class="dropdown-item text-primary pt-4" href="#">
                            My Trips
                          </a>
                          <a
                            class="dropdown-item text-primary pt-4"
                            onClick={e => {
                              this.setState({
                                redirect: "profile"
                              });
                            }}
                            href="#"
                          >
                            My Profile
                          </a>
                          <a class="dropdown-item text-primary pt-4" href="#">
                            Account
                          </a>
                          <a
                            class="dropdown-item text-primary pt-4"
                            href="#"
                            onClick={e => {
                              cookie.remove("cookie");
                            }}
                          >
                            Log Out
                          </a>
                        </div>
                      </li>
                    )}

                    <li class="nav-item dropdown pl-5">
                      <a
                        class="nav-link dropdown-toggle text-white pr-5"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Help
                      </a>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a class="dropdown-item text-primary pt-3" href="#">
                          Visit help center
                        </a>
                        <div class="dropdown-divider" />
                        <a class="dropdown-item text-primary pt-3" href="#">
                          Traveller
                        </a>
                        <a class="dropdown-item text-primary pt-3" href="#">
                          How it works
                        </a>
                        <a class="dropdown-item text-primary pt-3" href="#">
                          Security
                        </a>
                      </div>
                    </li>
                  </ul>

                  {cookie.load("cookie") == "owner" && (
                    <button
                      id="listProperty"
                      type="button"
                      class="btn btn-lightbtn btn-light btn-sm mr-auto list-property"
                      onClick={e => {
                        this.props.history.push("/add-property");
                      }}
                    >
                      List your Property
                    </button>
                  )}

                  <div class="navbar-brand ml-auto">
                    <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" />
                  </div>
                </div>
              </nav>
            </div>
            <div class="Jumbotron ">
              <div class="Jumbotron__wrapper">
                <div class="Jumbotron__content">
                  <h1 class="HeadLine pt-5 mt-4 ">
                    <br />
                    <span class="HeadLine__text  text-white">
                      Book beach houses, cabins,
                    </span>
                    <br />
                    <span class="HeadLine__text  text-white">
                      condos and more, worldwide
                    </span>
                  </h1>
                  <form
                    class="form-inline"
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}
                  >
                    <div class="form-group mx-sm-1 mb-2 pr-2">
                      <Field
                        className="form-control"
                        placeholder="Where do you want to go?"
                        name="location"
                        type="text"
                        component={this.renderField}
                      />
                    </div>
                    <div class="form-group mx-sm-1 mb-2 pr-2">
                      <Field
                        className="form-control"
                        placeholder="Arrival"
                        name="available_from"
                        type="date"
                        component={this.renderField}
                      />
                    </div>
                    <div class="form-group mx-sm-1 mb-2 pr-2">
                      <Field
                        className="form-control"
                        placeholder="Depart"
                        name="available_to"
                        type="date"
                        component={this.renderField}
                      />
                    </div>
                    <div class=" form-group mx-sm-1 mb-1">
                      <div class="btn-group counter">
                        <button
                          type="button"
                          class="btn btn-default counter-button counter-button--gray js-decrement"
                          /*onClick={() => {
                            console.log("Guests" + guests);
                            if (guests > 0) onChange(guests + 1);
                          }}*/
                        >
                          –
                        </button>
                        <Field
                          className="form-control counter-value text-center js-count col-3"
                          name="guests"
                          type="number"
                          component={this.renderField}
                          min="1"
                          step="1"
                        />
                        <button
                          type="button"
                          class="btn btn-default counter-button counter-button--gray js-increment"
                          /*onClick={e => {
                            this.setState({
                              guests: this.state.guests + 1
                            });
                          }}*/
                        >
                          +
                        </button>
                        <div class="pl-3">
                          <button
                            class="btn btn-primary btn-lg searchbox-submit js-searchSubmit"
                            data-effect="ripple"
                            type="submit"
                            tabindex="5"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="ValueProps hidden-xs">
                  <ul class="ValueProps__list">
                    <li class="ValueProps__item">
                      <strong class="ValueProps__title">
                        Your whole vacation starts here
                      </strong>
                      <span class="ValueProps__blurb">
                        Choose a rental from the world's best selection
                      </span>
                    </li>
                    <li class="ValueProps__item ">
                      <strong class="ValueProps__title">
                        Book and stay with confidence
                      </strong>
                      <span class="ValueProps__blurb">
                        Secure payments, peace of mind
                      </span>
                    </li>
                    <li class="ValueProps__item">
                      <strong class="ValueProps__title">
                        Your vacation your way
                      </strong>
                      <span class="ValueProps__blurb">
                        More space, more privacy, no compromises
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row nopadding ">
          <small class="font-wg h3 ml-3 mt-2">Trip History</small>
        </div>
        {pastTrips}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  // if (!values.location) {
  //   errors.location = "Required";
  // }
  // if (!values.available_from) {
  //   errors.available = "Required";
  // }

  // if (!values.available_to) {
  //   errors.available = "Required";
  // }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

//Get the current state of the signup page
const mapStateToProps = state => {
  // console.log("Current State At Home Page: " + JSON.stringify(state));
  return {
    tripDetails: state.trips.details,
    redirectVal: state.property.redirect
  };
};

//Export the App component so that it can be used in index.js
export default reduxForm({
  validate,
  form: "searchForm"
})(
  connect(
    mapStateToProps,
    { fetchTripHistory, searchProperty }
  )(withRouter(Home))
);
