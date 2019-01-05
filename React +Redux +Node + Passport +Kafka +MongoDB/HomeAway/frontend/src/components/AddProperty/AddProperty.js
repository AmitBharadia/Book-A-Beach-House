import React, { Component } from "react";
import Navbar from "../Common/Navbar";
import Dropzone from "react-dropzone";
import "./AddProperty.css";
import axios from "axios";
import FormData from "form-data";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: "location",
      authFlag: "",
      location: "",
      headline: "",
      description: "",
      type: "",
      accomodation: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      from: "",
      to: "",
      accepted: [],
      url: ""
    };
  }

  componentWillMount() {
    this.setState({
      showForm: "location",
      authFlag: "",
      location: "",
      headline: "",
      description: "",
      type: "",
      accomodation: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      from: "",
      to: "",
      fees: "",
      accepted: [],
      url: ""
    });
  }

  nullCheck() {
    var st = this.state;
    if (
      st.location != "" ||
      st.headline != "" ||
      st.description != "" ||
      st.type != "" ||
      st.accomodation != "" ||
      st.bedrooms != "" ||
      st.bathrooms != "" ||
      st.sqft != "" ||
      st.from != "" ||
      st.to != "" ||
      st.fees != ""
    ) {
      return false;
    }
    return true;
  }

  handleFile(e) {
    console.log("In file upload handler");
  }

  handleSubmit = e => {
    console.log("state:" + this.state);
    console.log(this.state);
    var form_data = new FormData();
    form_data.append("location", this.state.location);
    form_data.append("headline", this.state.headline);
    form_data.append("description", this.state.description);
    form_data.append("type", this.state.type);
    form_data.append("price", this.state.fees);
    form_data.append("max_guests", this.state.accomodation);
    form_data.append("bedrooms", this.state.bedrooms);
    form_data.append("bathrooms", this.state.bathrooms);
    form_data.append("sqft", this.state.sqft);
    form_data.append("available_from", this.state.from);
    form_data.append("available_to", this.state.to);
    form_data.append("file_upload_purpose", "property");
    this.state.accepted.forEach(file => {
      form_data.append("files", file);
    });
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("Form data", form_data);
    axios
      .post("http://localhost:3001/add-property", form_data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "multipart/form-data"
        }
      })
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
            console.log("Fail login :");
          }
        }
      });
    console.log("After login :", this.state);
  };
  render() {
    var redirect = "";
    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login-owner" />;
    }

    if (this.state.authFlag == "pass") {
      redirect = <Redirect to="/home" />;
    }
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
                        this.setState({
                          showForm: "location"
                        });
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
                        this.setState({
                          showForm: "details"
                        });
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
                        this.setState({
                          showForm: "photos"
                        });
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
                          this.setState({
                            showForm: "pricing"
                          });
                        }}
                        href="#"
                      >
                        Pricing
                      </a>
                      <div
                        className={
                          this.state.showForm == "pricing" ||
                          this.state.showForm == "fees"
                            ? ""
                            : "hidden"
                        }
                      >
                        <ul class="nav flex-column pl-1 nopadding">
                          <li class="nav-item">
                            <a
                              class="nav-link "
                              onClick={e => {
                                this.setState({
                                  showForm: "pricing"
                                });
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
                                this.setState({
                                  showForm: "fees"
                                });
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
              <form />
              <div class="col-9 nopadding border ">
                <div
                  className={this.state.showForm == "location" ? "" : "hidden"}
                >
                  {}
                  <div class="row-5 nopadding border">
                    <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                      <small class="font-wg h3">
                        Add the loction of rental
                      </small>
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <input
                        type="text"
                        class="form-control mt-5  mb-5"
                        id="location"
                        aria-describedby="emailHelp"
                        placeholder="Enter location"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            location: e.target.value
                          });
                        }}
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
                          this.setState({
                            showForm: "details"
                          });
                        }}
                      >
                        next
                      </button>
                    </div>
                  </div>
                  {}
                </div>
                <div
                  className={this.state.showForm == "details" ? "" : "hidden"}
                >
                  <div class="row-10 nopadding border">
                    <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                      <small class="font-wg h3">Describe Your Property</small>
                    </div>

                    <div class="row-5 mt-3 ml-4 mr-3 pl-">
                      <small class="font-wg h6">
                        Start out with desciptive headline and detailed summary
                        of your property
                      </small>
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <input
                        type="text"
                        class="form-control mt-5  mb-5"
                        aria-describedby="emailHelp"
                        placeholder="Headline"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            headline: e.target.value
                          });
                        }}
                      />
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <textarea
                        class="form-control mt-5  mb-5"
                        aria-describedby="emailHelp"
                        row="2"
                        placeholder="Property Description"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            description: e.target.value
                          });
                        }}
                      />
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <small class="font-wg h6">Property Type</small>
                      <select
                        class="form-control mt-2"
                        placeholder="Type"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            type: e.target.value
                          });
                        }}
                      >
                        <option>Apartment</option>
                        <option>House</option>
                      </select>
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <small class="font-wg h6">Accomodation</small>
                      <input
                        type="number"
                        placeholder="Guests"
                        class="form-control mt-2"
                        id="staticEmail2"
                        step="1"
                        min="1"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            accomodation: e.target.value
                          });
                        }}
                      />
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <small class="font-wg h6">Bedrooms</small>
                      <input
                        type="number"
                        placeholder="Bedrooms"
                        class="form-control mt-2"
                        id="staticEmail2"
                        step="1"
                        min="1"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            bedrooms: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div class="form-group ml-5 mr-5">
                      <small class="font-wg h6">Bathrooms</small>
                      <input
                        type="number"
                        placeholder="Bathrooms"
                        class="form-control mt-2"
                        id="staticEmail2"
                        step="1"
                        min="1"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            bathrooms: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div class="form-group ml-5 mr-5">
                      <small class="font-wg h6">Sqft</small>
                      <input
                        type="number"
                        placeholder="Sqft"
                        class="form-control mt-2"
                        id="staticEmail2"
                        step="1"
                        min="1"
                        onChange={e => {
                          console.log(e.target.value);
                          this.setState({
                            sqft: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div class="container">
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                        onClick={e => {
                          this.setState({
                            showForm: "location"
                          });
                        }}
                      >
                        back
                      </button>

                      <button
                        type="button"
                        class="btn btn-info btn-lg ml-5 mb-3 mr-5 float-right"
                        onClick={e => {
                          this.setState({
                            showForm: "photos"
                          });
                        }}
                      >
                        next
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={this.state.showForm == "photos" ? "" : "hidden"}
                >
                  <div class="row-5 nopadding border">
                    <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                      <small class="font-wg h3">
                        Add the photos of your Property
                      </small>
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <Dropzone
                        class="w-100"
                        multiple={true}
                        accept="image/jpeg, image/png"
                        maxFiles="1"
                        onDrop={(accepted, rejected) => {
                          console.log("Type of file " + typeof accepted[0]);
                          this.setState({
                            accepted,
                            rejected,
                            url: URL.createObjectURL(accepted[0])
                          });
                        }}
                      />
                    </div>
                    <div />

                    <small class="font-wg h3 pl-3 ml-3">Accepted files</small>
                    <ul>
                      {this.state.accepted.map(f => (
                        <li class="font-wg h5 pl-3 ml-3" key={f.name}>
                          {f.name} - {f.size} bytes
                        </li>
                      ))}
                    </ul>

                    <div class="container">
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                        onClick={e => {
                          this.setState({
                            showForm: "details"
                          });
                        }}
                      >
                        back
                      </button>

                      <button
                        type="button"
                        class="btn btn-info btn-lg ml-5 mb-3 mr-5 float-right"
                        onClick={e => {
                          this.setState({
                            showForm: "pricing"
                          });
                        }}
                      >
                        next
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={this.state.showForm == "pricing" ? "" : "hidden"}
                >
                  <div class="row-5 nopadding border">
                    <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                      <small class="font-wg h4">
                        Select starting point for setting up your Availibility
                      </small>
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <input
                        type="date"
                        placeholder="From"
                        class="form-control mt-2"
                        onChange={e => {
                          this.setState({
                            from: e.target.value
                          });
                        }}
                      />
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <input
                        type="date"
                        placeholder="To"
                        class="form-control mt-2"
                        id="staticEmail2"
                        step="1"
                        min="1"
                        onChange={e => {
                          this.setState({
                            to: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div class="container">
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                        onClick={e => {
                          this.setState({
                            showForm: "photos"
                          });
                        }}
                      >
                        back
                      </button>

                      <button
                        type="button"
                        class="btn btn-info btn-lg ml-5 mb-3 mr-5 float-right"
                        onClick={e => {
                          this.setState({
                            showForm: "fees"
                          });
                        }}
                      >
                        next
                      </button>
                    </div>
                  </div>
                </div>
                <div className={this.state.showForm == "fees" ? "" : "hidden"}>
                  <div class="row-5 nopadding border">
                    <div class="row mt-3 ml-5 mr-3 pl-4 pb-2 border-bottom">
                      <small class="font-wg h4">
                        Select Fees for your Property
                      </small>
                    </div>

                    <div class="form-group ml-5 mr-5">
                      <input
                        type="number"
                        placeholder="avg/night"
                        class="form-control mt-2"
                        id="staticEmail2"
                        step="1"
                        min="1"
                        onChange={e => {
                          console.log(this.state);
                          this.setState({
                            fees: e.target.value
                          });
                        }}
                      />
                    </div>

                    <div class="container">
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-lg ml-5 mb-3 mr-5"
                        onClick={e => {
                          this.setState({
                            showForm: "pricing"
                          });
                        }}
                      >
                        back
                      </button>

                      <button
                        type="button"
                        class="btn btn-info btn-lg ml-5 mb-3 mr-5"
                        onClick={e => {
                          this.handleSubmit(e);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 nopadding" />
        </div>
      </div>
    );
  }
}

export default AddProperty;
