import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./Home.css";
import {
  searchQuery,
  loginQuery,
  searchAllQuery,
  listOfTrips
} from "../../queries";
import { compose, graphql, Query, withApollo } from "react-apollo";
import gql from "graphql-tag";

//App Component
class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      place: "",
      arrival: "",
      depart: "",
      guests: 1,
      redirect: "",
      result: [],
      history: []
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      place: "",
      arrival: "",
      depart: "",
      guests: "1",
      redirect: "",
      result: [],
      history: []
    });

    // axios.get("http://localhost:3001/trip-history").then(res => {
    //   console.log("Status: " + res.status);
    //   console.log("Data: " + JSON.stringify(res.data.result));
    //   if (res.status == 200) {
    //     this.setState({
    //       history: res.data.result
    //     });
    //   }
    // });

    this.props.client.query({
      query: listOfTrips,
      variables: {
        user_id:cookie.load("cookie")
      }
    }).then(res => {
      alert("Response" + JSON.stringify(res));
      console.log("Data: " + JSON.stringify(res.data));
      this.setState({
          history: res.data.bookings
        });
    });
  }

  searchHandler = async e => {
    console.log("state: " + JSON.stringify(this.state));
    e.preventDefault();

    this.props.client
      .query({
        query: searchQuery,
        variables: {
          place: this.state.place,
          available_from: this.state.arrival,
          available_to: this.state.depart,
          max_guests: this.state.guests + ""
        }
      })
      .then(res => {
        alert("Response" + JSON.stringify(res));
        console.log("Data: " + JSON.stringify(res.data));
        this.setState({
          result: res.data.search,
          redirect: "property-list"
        });
      });
  };

  render() {
    var redirectVal = "";

    if (this.state.redirect == "property-list") {
      redirectVal = (
        <Redirect
          to={{
            pathname: "/property-list",
            state: { referrer: this.state.result }
          }}
        />
      );
    }

    if (this.state.redirect == "profile") {
      redirectVal = <Redirect to="/profile" />;
    }

    if (this.state.redirect == "add-property") {
      redirectVal = <Redirect to="/add-property" />;
    }
    //  console.log("history: " + this.state.history);
    var tripHistory = this.state.history;

    if (tripHistory) {
      var pastTrips = tripHistory.map(item => {
        console.log(tripHistory.length);
        return (
          <div class="w-50 ml-5">
            <br />
            <div
              class="card mt-3 "
              onM
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
                    <h4 class="card-title ">{item.headline}-{item.location}</h4>
                    <p class="card-text">
                      <br />
                      <br />
                      <h5>
                        From: {item.from} To : {item.to}
                      </h5>
                      <br />
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="Home">
        {redirectVal}
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
                        this.setState({
                          redirect: "add-property"
                        });
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
                  <form class="form-inline">
                    <div class="form-group mx-sm-1 mb-2 pr-2">
                      <label for="staticEmail2" class="sr-only">
                        place
                      </label>
                      <input
                        type="text"
                        class="form-control js-destination js-launchModal tt-input"
                        id="staticEmail2"
                        placeholder="Where do you want to go?"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            place: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div class="form-group mx-sm-1 mb-2 pr-2">
                      <label for="staticEmail2" class="sr-only">
                        Arrival
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        id="staticEmail2"
                        placeholder="Arrival"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            arrival: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div class="form-group mx-sm-1 mb-2 pr-2">
                      <label for="staticEmail2" class="sr-only">
                        depart
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        id="staticEmail2"
                        placeholder="Depart"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            depart: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div class=" form-group mx-sm-1 mb-1">
                      <div class="btn-group counter">
                        <button
                          type="button"
                          class="btn btn-default counter-button counter-button--gray js-decrement"
                          onClick={e => {
                            if (this.state.guests > 0)
                              this.setState({
                                guests: this.state.guests - 1
                              });
                          }}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          class="form-control counter-value text-center js-count col-3"
                          value={this.state.guests}
                          onChange={e => {
                            this.setState({
                              guests: e.target.value
                            });
                          }}
                          min="1"
                          step="1"
                          name="adults"
                        />
                        <button
                          type="button"
                          class="btn btn-default counter-button counter-button--gray js-increment"
                          onClick={e => {
                            this.setState({
                              guests: this.state.guests + 1
                            });
                          }}
                        >
                          +
                        </button>
                        <div class="pl-3">
                          <button
                            class="btn btn-primary btn-lg searchbox-submit js-searchSubmit"
                            data-effect="ripple"
                            type="button"
                            tabindex="5"
                            data-loading-animation="true"
                            onClick={e => {
                              this.searchHandler(e);
                            }}
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

//Export the App component so that it can be used in index.js
export default compose(
  graphql(searchQuery),
  graphql(listOfTrips)
)(withApollo(Home));
