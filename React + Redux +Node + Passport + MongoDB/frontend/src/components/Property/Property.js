import React, { Component } from "react";
import "./Property.css";
import Navbar from "../Common/Navbar";
import SearchForm from "../Common/SearchForm";
import axios from "axios";
import { Redirect, withRouter } from "react-router";
import cookie from "react-cookies";

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { findPropertyImage, bookProperty } from "./../../Actions";

//App Component
class Property extends Component {
  componentDidMount(props) {
    this.props.findPropertyImage({ _id: this.props.curr_property_id });
  }

  //Define component that you want to render
  renderField(field) {
    //console.log("Field Details : " + JSON.stringify(field));
    const {
      meta: { touched, error },
      type,
      placeholder,
      value,
      row,
      step,
      min,
      className
    } = field;

    var newClassName = `form-group ${touched && error ? "has-danger" : ""}`;

    console.log("value : " + value);
    return (
      <div class={newClassName}>
        <label>{field.label}</label>
        <input
          class={className}
          type={type}
          value={value}
          placeholder={placeholder}
          row={row}
          step={step}
          min={min}
          {...field.input}
        />
        <div class={{ className }}>{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    values["property_id"] = this.props.curr_property_id;
    this.props.bookProperty(values);
  }

  render() {
    var propertyDet = {};

    if (this.props.propertyList && this.props.curr_property_id) {
      this.props.propertyList.map(property => {
        console.log("Property : ", JSON.stringify(property));
        if (property._id == this.props.curr_property_id) {
          console.log("Found Property ");
          propertyDet = property;
        }
      });
    }
    console.log("Current  Property : ", JSON.stringify(propertyDet));
    var redirect = "";

    if (this.props.redirectFlag) {
      this.props.history.push("/home");
    }
    if (!cookie.load("cookie")) {
      this.props.history.push("/login-traveller");
    }

    var image = this.props.propertyImageList
      ? this.props.propertyImageList
      : new Array(5);

    const { handleSubmit } = this.props;
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
                {image[0] && (
                  <div class="carousel-item active">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + image[0]}
                      alt="First slide"
                    />
                  </div>
                )}
                {image[1] && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + image[1]}
                      alt="Second slide"
                    />
                  </div>
                )}
                {image[2] && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + image[2]}
                      alt="Third slide"
                    />
                  </div>
                )}

                {image[3] && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + image[3]}
                      alt="Fourth slide"
                    />
                  </div>
                )}

                {image[4] && (
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src={"data:image/jpeg;base64," + image[4]}
                      alt="Fifth slide"
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
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
                      <Field
                        class="form-control no-border book-date"
                        className="no-border nopadding"
                        name="fm"
                        type="date"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div class="col-6 border nopadding pl-1">
                    <div class="form-group nopadding">
                      {/* <input
                        type="date"
                        class="form-control no-border book-date"
                        id="staticEmail2"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            to: e.target.value
                          });
                        }}
                      /> */}
                      <Field
                        class="form-control no-border book-date"
                        className="no-border nopadding"
                        name="to"
                        type="date"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                </div>
                <div class="row-2  nopadding">
                  <div class="col nopadding border-left border-right border-bottom">
                    <div class="form-group nopadding">
                      {/* <input
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
                      /> */}

                      <Field
                        class="form-control no-border book-date"
                        className="no-border nopadding"
                        placeholder="Guests"
                        min="1"
                        step="1"
                        name="guests"
                        type="number"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row  nopadding">
                <div class="col text-center  mt-3 mb-3">
                  <button type="submit" class="btn btn-lg btn-info  btn-block">
                    Book
                  </button>
                </div>
              </div>
            </form>
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

const mapStateToProps = state => {
  console.log("State: ", state);
  return {
    propertyList: state.property.details,
    curr_property_id: state.property.curr_prop_id,
    propertyImageList: state.propertyImage.imageList,
    redirectFlag: state.bookproperty.redirectFlag
  };
};

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  // if (!values.username) {
  //   errors.username = "Required";
  // } else if (
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  // ) {
  //   errors.username = "Invalid email address";
  // }
  // if (!values.password) {
  //   errors.password = "Required";
  // }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}
export default reduxForm({ validate, form: "bookPropertyForm" })(
  connect(
    mapStateToProps,
    { findPropertyImage, bookProperty }
  )(withRouter(Property))
);
