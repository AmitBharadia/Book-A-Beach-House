import React, { Component } from "react";
import "./PropertyList.css";
import Navbar from "../Common/Navbar";
import { Redirect } from "react-router";
import SearchForm from "../Common/SearchForm";
import cookie from "react-cookies";
import PropertyItem from "./PropertyItem";

import { connect } from "react-redux";
import { updatePageIndex } from "./../../Actions";

//App Component
class PropertyList extends Component {
  render() {
    var redirect = null;

    if (!cookie.load("cookie")) {
      redirect = <Redirect to="/login-traveller" />;
    }

    var property_div = "";

    var list = this.props.propertyList ? this.props.propertyList : [];
    var pageNavigationList = [];
    console.log("Current page index ", this.props.currentPageIndex);
    for (var i = 0; i < list.length / 5; i++) {
      pageNavigationList.push(
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            onClick={e => {
              var index = i;
              console.log("i : ", index);
              this.props.updatePageIndex(`${index + 1}`);
            }}
          >
            {i + 1}
          </a>
        </li>
      );
    }

    //  console.log("PropertyList :" + this.props.propertyList);

    property_div = list.map(propertyDetails => {
      //console.log("propertyDetails:", propertyDetails); // value
      return <PropertyItem property={propertyDetails} />;
    });

    //}
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
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                {pageNavigationList}
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
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

//Get the current state of the signup page
const mapStateToProps = state => {
  console.log(
    "Current State : " + JSON.stringify(state.property.currentPageIndex)
  );
  return {
    propertyList: state.property.details,
    property_img: state.propertyImage.imageList,
    currentPageIndex: state.property.currentPageIndex
  };
};

export default connect(
  mapStateToProps,
  { updatePageIndex }
)(PropertyList);
