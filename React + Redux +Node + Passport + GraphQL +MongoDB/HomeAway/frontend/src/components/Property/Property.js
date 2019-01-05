import React, { Component } from "react";
import "./Property.css";
import Navbar from "../Common/Navbar";
import SearchForm from "../Common/SearchForm";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import {bookPropertyMutation} from "../../mutation";

import { compose, graphql, withApollo } from "react-apollo";

//App Component
class Property extends Component {
  constructor(props) {
    super(props);
    if (cookie.load("cookie")) {
      this.state = {
        from: "",
        to: "",
        guests: "",
        authFlag: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        redirectVal: "",
        location: props.location.propertyDetails.location,
        headline: props.location.propertyDetails.headline
      };
    } else {
      this.state = {
        from: "",
        to: "",
        guests: "",
        authFlag: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        redirectVal: ""
      };
    }

    console.log(
      "props recievde by constructor " +
        JSON.stringify(props.location.propertyDetails)
    );
  }


  onSubmit(e) {
    console.log("state: " + this.state);
    var id = "";
    if (this.props.location.propertyDetails) {
      id = this.props.location.propertyDetails.id;
      console.log(this.props.location.propertyDetails.id);
    }

    this.props.client
        .mutate({
          mutation: bookPropertyMutation,
          variables: {
            from: this.state.from,
            to: this.state.to,
            guests: this.state.guests,
            user_id: cookie.load("cookie"),
            location:this.state.location,
            headline:this.state.headline|| "Amazing "
          }
        })
        .then(res => {
          alert("Response" + JSON.stringify(res));
          console.log("Data: " + JSON.stringify(res.data));
          this.setState({
            authFlag:"pass"
          })
        });
  }

  render() {
    var propertyDet = {};
    if (this.props.location.propertyDetails) {
      propertyDet = this.props.location.propertyDetails;
      console.log(this.props.location.propertyDetails);
    }
    var redirect = "";

    if (
      this.state.authFlag == "pass" ||
      this.state.redirectVal == "home" ||
      !cookie.load("cookie")
    ) {
      redirect = <Redirect to="/home" />;
    }

    return (
      <div>
        {redirect}
        <Navbar />
        <SearchForm />
        <div id="property-main" class="row  container-fluid ml-1 mt-5">
          <div class="col-7 border border-light carousel-container">
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                {this.state.image1 && (
                  <div class="carousel-item active">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + this.state.image1}
                      alt="First slide"
                    />
                  </div>
                )}
                {this.state.image2 && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + this.state.image2}
                      alt="Second slide"
                    />
                  </div>
                )}
                {this.state.image3 && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + this.state.image3}
                      alt="Third slide"
                    />
                  </div>
                )}

                {this.state.image4 && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + this.state.image3}
                      alt="Third slide"
                    />
                  </div>
                )}

                {this.state.image5 && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + this.state.image3}
                      alt="Third slide"
                    />
                  </div>
                )}
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span class="carousel-control-prev-icon" aria-hidden="true" />
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span class="carousel-control-next-icon" aria-hidden="true" />
                <span class="sr-only">Next</span>
              </a>
            </div>
            <div class="row mt-3  " />
            <div class="row nopadding">
              <h4 class="font-weight-bold">{propertyDet.headline}</h4>
            </div>
            <div class="row nopadding">
              <small class="h8 font-weight-light pb-2">
                {propertyDet.location}
              </small>
            </div>
            <div class="row nopadding font-weight-light">
              <div class="col nopadding">Apartment</div>
              <div class="col nopadding">Bedrooms</div>
              <div class="col nopadding">Sleeps</div>
              <div class="col nopadding">Bathrooms</div>
            </div>
            <div class="row nopadding ">
              <div class="col nopadding"> {propertyDet.sqft}</div>
              <div class="col nopadding"> {propertyDet.bedrooms}</div>
              <div class="col nopadding"> {propertyDet.max_guests}</div>
              <div class="col nopadding"> {propertyDet.bathrooms}</div>
            </div>
            <div class="row nopadding">
              <p class="mt-4 font-weight-light">{propertyDet.description}</p>
            </div>
          </div>
          <div class="col-4   border book-container ">
            <div class="row nopadding ">
              <h2 class="mt-5 font-weight-light">
                {propertyDet.price}
                <small class="h6 text-muted font-weight-light">avg/night</small>
              </h2>
            </div>

            <div class="row-3 mt-5">
              <div class="row nopadding">
                <div class="col-6  pl-1">
                  <label for="staticEmail2" class="text-primary">
                    Check In
                  </label>
                </div>
                <div class="col-6  pl-1">
                  <label for="staticEmail2" class="text-primary">
                    Check Out
                  </label>
                </div>
              </div>
              <div class="row nopadding">
                <div class="col-6 border nopadding pl-1">
                  <div class="form-group nopadding">
                    <input
                      type="date"
                      class="form-control no-border book-date"
                      id="staticEmail2"
                      onChange={e => {
                        console.log(e.target.value);
                        this.setState({
                          from: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
                <div class="col-6 border nopadding pl-1">
                  <div class="form-group nopadding">
                    <input
                      type="date"
                      class="form-control no-border book-date"
                      id="staticEmail2"
                      onChange={e => {
                        console.log(e.target.value);
                        this.setState({
                          to: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="row-2  nopadding">
                <div class="col nopadding border-left border-right border-bottom">
                  <div class="form-group nopadding">
                    <input
                      type="number"
                      placeholder="Guests"
                      class="form-control no-border book-date"
                      id="staticEmail2"
                      min="1"
                      step="1"
                      onChange={e => {
                        console.log(e.target.value);
                        this.setState({
                          guests: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row  nopadding">
              <div class="col text-center  mt-3 mb-3">
                <button
                  type="button"
                  class="btn btn-lg btn-info  btn-block"
                  onClick={e => this.onSubmit(e)}
                >
                  Book
                </button>
              </div>
            </div>

            <div class="row-2 border-top border-bottom pl-2">
              <div class="row nopadding">
                <div class="col nopadding">
                  <h6 class="mt-2 font-weight-light">Owner</h6>
                </div>
              </div>
              <div class="row nopadding">
                <small class="h9 text-primary font-weight-light mb-1">
                  Ask Owner a Question
                </small>
              </div>
            </div>
          </div>
          <div class="col border border-light">asd</div>
        </div>
      </div>
    );
  }
}

export default graphql(bookPropertyMutation)(withApollo(Property));
