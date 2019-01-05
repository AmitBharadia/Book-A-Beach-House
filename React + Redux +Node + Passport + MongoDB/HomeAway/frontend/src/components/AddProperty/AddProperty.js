import React, { Component } from "react";
import Navbar from "../Common/Navbar";
import Dropzone from "react-dropzone";
import "./AddProperty.css";
import axios from "axios";
import FormData from "form-data";
import { Redirect } from "react-router";
import cookie from "react-cookies";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addNewProperty, showPropertyForm } from "./../../Actions";

class AddProperty extends Component {
  componentWillMount() {
    this.props.showPropertyForm("location");
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
      min
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
          row={row}
          step={step}
          min={min}
          {...field.input}
        />
        <div class={{ className }}>{touched ? error : ""}</div>
      </div>
    );
  }

  //Action executed
  onSubmit(values) {
    console.log(values);
    var form_data = new FormData();
    var files;
    Object.keys(values).forEach(function(key) {
      if (key != "files") form_data.append(key, values[key]);
      else {
        files = values[key];
      }
    });
    form_data.append("file_upload_purpose", "property");
    files.forEach(file => {
      form_data.append("files", file);
    });
    /// We can noot print out the form data values
    this.props.addNewProperty(form_data);
  }

  render() {
    var redirect = "";
    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login-owner" />;
    }

    if (this.props.redirect) {
      this.props.history.push("/home");
    }

    var showForm = this.props.showForm;
    const { handleSubmit } = this.props;

    return (
      <div className="AddProperty">
        {redirect}
        <Navbar />
        <div class="row ml-2 mr-1 mt-5  ">
          <div class="col-3 nopadding " />
          <div class="col-6  nopadding  ">
            <div class="row mt-5 ml-1 mr-1 mb-5  ">
              <div class="col-3 nopadding border">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link active" href="#">
                      Welcome
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      onClick={e => {
                        // this.setState({
                        //   showForm: "location"
                        // });
                        this.props.showPropertyForm("location");
                      }}
                      href="#"
                    >
                      Location
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      onClick={e => {
                        // this.setState({
                        //   showForm: "details"
                        // });
                        this.props.showPropertyForm("details");
                      }}
                      href="#"
                    >
                      Details
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      onClick={e => {
                        // this.setState({
                        //   showForm: "photos"
                        // });
                        this.props.showPropertyForm("photos");
                      }}
                      href="#"
                    >
                      Photos
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link " href="#">
                      <a
                        class="nav-link nopadding"
                        onClick={e => {
                          // this.setState({
                          //   showForm: "pricing"
                          // });
                          this.props.showPropertyForm("pricing");
                        }}
                        href="#"
                      >
                        Pricing
                      </a>
                      <div
                        className={
                          showForm == "pricing" || showForm == "fees"
                            ? ""
                            : "hidden"
                        }
                      >
                        <ul class="nav flex-column pl-1 nopadding">
                          <li class="nav-item">
                            <a
                              class="nav-link "
                              onClick={e => {
                                // this.setState({
                                //   showForm: "pricing"
                                // });
                                this.props.showPropertyForm("pricing");
                              }}
                              href="#"
                            >
                              Availibility
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              onClick={e => {
                                // this.setState({
                                //   showForm: "fees"
                                // });
                                this.props.showPropertyForm("fees");
                              }}
                              href="#"
                            >
                              Fees
                            </a>
                          </li>
                        </ul>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-9 nopadding border ">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <div className={showForm == "location" ? "" : "hidden"}>
                    {}
                    <div class="row-5 nopadding border">
                      <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                        <small class="font-wg h3">
                          Add the loction of rental
                        </small>
                      </div>

                      <div class="form-group ml-5 mr-5">
                        {/* <input
                          type="text"
                          class="form-control mt-5  mb-5"
                          id="location"
                          aria-describedby="emailHelp"
                          placeholder="Enter location"
                          onChange={e => {
                            console.log(e.target.value);
                            // this.setState({
                            //   location: e.target.value
                            // });
                          }}
                        /> */}

                        <Field
                          className="form-control mt-5  mb-5"
                          placeholder="Enter email"
                          name="location"
                          type="text"
                          placeholder="Enter location"
                          component={this.renderField}
                        />
                      </div>
                      <div class="container">
                        <button
                          type="button hidden"
                          class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                        >
                          back
                        </button>

                        <button
                          type="button"
                          class="btn btn-info btn-lg ml-5 mb-3 mr-5 float-right"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "details"
                            // });
                            this.props.showPropertyForm("details");
                          }}
                        >
                          next
                        </button>
                      </div>
                    </div>
                    {}
                  </div>
                  <div className={showForm == "details" ? "" : "hidden"}>
                    <div class="row-10 nopadding border">
                      <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                        <small class="font-wg h3">Describe Your Property</small>
                      </div>

                      <div class="row-5 mt-3 ml-4 mr-3 pl-">
                        <small class="font-wg h6">
                          Start out with desciptive headline and detailed
                          summary of your property
                        </small>
                      </div>

                      <div class="form-group ml-5 mr-5">
                        {/* <input
                          type="text"
                          class="form-control mt-5  mb-5"
                          aria-describedby="emailHelp"
                          placeholder="Headline"
                          onChange={e => {
                            console.log(e.target.value);
                            // this.setState({
                            //   headline: e.target.value
                            // });
                          }}
                        /> */}
                        <Field
                          type="text"
                          class="form-control mt-5  mb-5"
                          aria-describedby="emailHelp"
                          placeholder="Headline"
                          name="headline"
                          component={this.renderField}
                        />
                      </div>

                      <div class="form-group ml-5 mr-5">
                        {/* <textarea
                          class="form-control mt-5  mb-5"
                          aria-describedby="emailHelp"
                          row="2"
                          placeholder="Property Description"
                          onChange={e => {
                            console.log(e.target.value);
                            // this.setState({
                            //   description: e.target.value
                            // });
                          }}
                        /> */}

                        <Field
                          type="textarea"
                          class="form-control mt-5  mb-5"
                          aria-describedby="emailHelp"
                          row="2"
                          placeholder="Property Description"
                          name="description"
                          component={this.renderField}
                        />
                      </div>

                      <div class="form-group ml-5 mr-5">
                        <small class="font-wg h6">Property Type</small>
                        <Field
                          name="type"
                          class="form-control mt-2"
                          placeholder="Type"
                          component="select"
                        >
                          <option selected="selected">Apartment</option>
                          <option>House</option>
                        </Field>
                      </div>

                      <div class="form-group ml-5 mr-5">
                        <small class="font-wg h6">Accomodation</small>
                        {/* <input
                          type="number"
                          placeholder="Guests"
                          class="form-control mt-2"
                          id="staticEmail2"
                          step="1"
                          min="1"
                          onChange={e => {
                            console.log(e.target.value);
                            // this.setState({
                            //   accomodation: e.target.value
                            // });
                          }}
                        /> */}
                        <Field
                          type="number"
                          class="form-control mt-5  mb-5"
                          placeholder="Guests"
                          name="max_guests"
                          step="1"
                          min="1"
                          component={this.renderField}
                        />
                      </div>

                      <div class="form-group ml-5 mr-5">
                        <small class="font-wg h6">Bedrooms</small>
                        {/* <input
                          type="number"
                          placeholder="Bedrooms"
                          class="form-control mt-2"
                          id="staticEmail2"
                          step="1"
                          min="1"
                          onChange={e => {
                            console.log(e.target.value);
                            // this.setState({
                            //   bedrooms: e.target.value
                            // });
                          }}
                        /> */}

                        <Field
                          type="number"
                          class="form-control mt-5  mb-5"
                          placeholder="Bedrooms"
                          name="bedrooms"
                          step="1"
                          min="1"
                          component={this.renderField}
                        />
                      </div>
                      <div class="form-group ml-5 mr-5">
                        <small class="font-wg h6">Bathrooms</small>
                        {/* <input
                          type="number"
                          placeholder="Bathrooms"
                          class="form-control mt-2"
                          id="staticEmail2"
                          step="1"
                          min="1"
                          onChange={e => {
                            console.log(e.target.value);
                            // this.setState({
                            //   bathrooms: e.target.value
                            // });
                          }}
                        /> */}

                        <Field
                          type="number"
                          class="form-control mt-5  mb-5"
                          placeholder="Bathrooms"
                          name="bathrooms"
                          step="1"
                          min="1"
                          component={this.renderField}
                        />
                      </div>
                      <div class="form-group ml-5 mr-5">
                        <small class="font-wg h6">Sqft</small>
                        {/* <input
                          type="number"
                          placeholder="Sqft"
                          class="form-control mt-2"
                          id="staticEmail2"
                          step="1"
                          min="1"
                          onChange={e => {
                            console.log(e.target.value);
                            // this.setState({
                            //   sqft: e.target.value
                            // });
                          }}
                        /> */}
                        <Field
                          type="number"
                          class="form-control mt-5  mb-5"
                          placeholder="Sqft"
                          name="sqft"
                          step="1"
                          min="1"
                          component={this.renderField}
                        />
                      </div>
                      <div class="container">
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "location"
                            // });
                            this.props.showPropertyForm("location");
                          }}
                        >
                          back
                        </button>

                        <button
                          type="button"
                          class="btn btn-info btn-lg ml-5 mb-3 mr-5 float-right"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "photos"
                            // });
                            this.props.showPropertyForm("photos");
                          }}
                        >
                          next
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={showForm == "photos" ? "" : "hidden"}>
                    <div class="row-5 nopadding border">
                      <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                        <small class="font-wg h3">
                          Add the photos of your Property
                        </small>
                      </div>

                      <div class="form-group ml-5 mr-5">
                        <Field
                          className="w-100 mt-3"
                          accept="image/jpeg, image/png"
                          name="files"
                          component={renderDropzoneInput}
                        />
                      </div>
                      <div />

                      <div class="container">
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "details"
                            // });
                            this.props.showPropertyForm("details");
                          }}
                        >
                          back
                        </button>

                        <button
                          type="button"
                          class="btn btn-info btn-lg ml-5 mb-3 mr-5 float-right"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "pricing"
                            // });
                            this.props.showPropertyForm("pricing");
                          }}
                        >
                          next
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={showForm == "pricing" ? "" : "hidden"}>
                    <div class="row-5 nopadding border">
                      <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                        <small class="font-wg h4">
                          Select starting point for setting up your Availibility
                        </small>
                      </div>

                      <div class="form-group ml-5 mr-5">
                        {/* <input
                          type="date"
                          placeholder="From"
                          class="form-control mt-2"
                          onChange={e => {
                            // this.setState({
                            //   from: e.target.value
                            // });
                          }}
                        /> */}

                        <Field
                          type="date"
                          class="form-control mt-5  mb-5"
                          placeholder="From"
                          name="available_from"
                          component={this.renderField}
                        />
                      </div>

                      <div class="form-group ml-5 mr-5">
                        {/* <input
                          type="date"
                          placeholder="To"
                          class="form-control mt-2"
                          id="staticEmail2"
                          step="1"
                          min="1"
                          onChange={e => {
                            // this.setState({
                            //   to: e.target.value
                            // });
                          }}
                        /> */}

                        <Field
                          type="date"
                          class="form-control mt-5  mb-5"
                          placeholder="To"
                          name="available_to"
                          component={this.renderField}
                        />
                      </div>
                      <div class="container">
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "photos"
                            // });
                            this.props.showPropertyForm("photos");
                          }}
                        >
                          back
                        </button>

                        <button
                          type="button"
                          class="btn btn-info btn-lg ml-5 mb-3 mr-5 float-right"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "fees"
                            // });
                            this.props.showPropertyForm("fees");
                          }}
                        >
                          next
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={showForm == "fees" ? "" : "hidden"}>
                    <div class="row-5 nopadding border">
                      <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                        <small class="font-wg h4">
                          Select Fees for your Property
                        </small>
                      </div>

                      <div class="form-group ml-5 mr-5">
                        {/* <input
                          type="number"
                          placeholder="avg/night"
                          class="form-control mt-2"
                          id="staticEmail2"
                          step="1"
                          min="1"
                          onChange={e => {
                            console.log(this.state);
                            // this.setState({
                            //   fees: e.target.value
                            // });
                          }}
                        /> */}

                        <Field
                          type="number"
                          class="form-control mt-5  mb-5"
                          placeholder="Avg/night"
                          name="price"
                          step="1"
                          min="1"
                          component={this.renderField}
                        />
                      </div>

                      <div class="container">
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                          onClick={e => {
                            // this.setState({
                            //   showForm: "pricing"
                            // });
                            this.props.showPropertyForm("pricing");
                          }}
                        >
                          back
                        </button>

                        <button
                          type="submit"
                          class="btn btn-info btn-lg ml-5 mb-3 mr-5"
                          // onClick={e => {
                          //   this.handleSubmit(e);
                          // }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-3 nopadding" />
        </div>
      </div>
    );
  }
}

const renderDropzoneInput = field => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
      >
        <div>
          Try dropping some files here, or click to select files to upload.
        </div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error && <span className="error">{field.meta.error}</span>}
      {files &&
        Array.isArray(files) && (
          <ul>
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        )}
    </div>
  );
};
const mapStateToProps = state => {
  //console.log(" Show Form :", JSON.stringify(state));
  return {
    showForm: state.addProperty.showForm
      ? state.addProperty.showForm
      : "location",
    redirect: state.addProperty.redirect
  };
};

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  /*if (!values.username) {
    errors.username = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }*/

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "addPropertyForm"
})(
  connect(
    mapStateToProps,
    { showPropertyForm, addNewProperty }
  )(AddProperty)
);
