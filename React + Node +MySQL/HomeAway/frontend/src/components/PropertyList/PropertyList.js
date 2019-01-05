import React, { Component } from "react";
import "./PropertyList.css";
import Navbar from "../Common/Navbar";
import { Redirect } from "react-router";
import SearchForm from "../Common/SearchForm";
import cookie from "react-cookies";
import PropertyItem from "./PropertyItem";
//App Component
class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyDetails: null
    };
  }

  componentWillMount() {
    this.setState({
      propertyDetails: null
    });
  }
  render() {
    var redirect = null;

    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login-traveller" />;
    }

    if (this.state.propertyDetails != null) {
      return (
        <Redirect
          to={{
            pathname: "/Property",
            propertyDetails: this.state.propertyDetails
          }}
        />
      );
    }

    var property_div = "";
    if (this.props.location.state && this.props.location.state.referrer) {
      console.log(
        "String output:" +
          JSON.stringify(this.props.location.state.referrer.result)
      );
      var list = this.props.location.state.referrer.result;
      property_div = list.map(item => {
        return <PropertyItem property={item} />;
      });
    }
    return (
      <div className="PropertyList">
        <Navbar />
        <SearchForm />
        {redirect}
        <div class="actual-body row nopadding">
          <div class="col-sm-8 nopadding">
            <div class=" filter-body row ml-3 mr-1 pl-4 pt-3 pb-2 mb-3 border border-top border-bottom fixed-top bg-light ">
              <div class="col-1 text-black-50">Price</div>
              <div class="col-1 text-black-50">Bedrooms</div>
              <div class="col-1 text-black-50">sqft</div>
            </div>
            <section class="mt-5 pt-3 ml-3">{property_div}</section>
          </div>

          <div class="col-sm-4 mt-5">
            <div class="static-map-image">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d406263.62059104!2d-122.09759927347085!3d37.29668531748616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcae48af93ff5%3A0xb99d8c0aca9f717b!2sSan+Jose%2C+CA!5e0!3m2!1sen!2sus!4v1537677193012"
                width="600"
                height="450"
                frameborder="0"
                allowfullscreen
                class="iframe_map"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//Export the App component so that it can be used in index.js
export default PropertyList;
