import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";

import { connect } from "react-redux";
import { findPropertyImage, goToSingleProperty } from "./../../Actions";

class PropertyItem extends Component {
  componentDidMount(props) {
    this.props.findPropertyImage(this.props.property);
  }

  render() {
    var item = this.props.property;
    console.log("Each property :", item);

    var property_img = this.props.property_img;
    // console.log("Image :", property_img);

    return (
      <div>
        <div>
          <br />
          <div
            class="card mt-3 "
            onClick={e => {
              console.log("asds");
              this.props.goToSingleProperty(item._id);
              this.props.history.push("/property");
            }}
          >
            <div class="row nopadding">
              <div class="col-4 nopadding ">
                <img
                  class="img-responsive nopadding"
                  style={{ height: 250, width: 200 }}
                  src={"data:image/jpeg;base64," + property_img}
                />
              </div>
              <div class="card-list col-6 ">
                <div class="card-block nopadding ">
                  <h4 class="card-title pt-2">{item.headline}</h4>
                  <p class="card-text">
                    <br />
                    <h5>
                      Apartments {item.bedrooms} BR {item.bathrooms} BA Sleeps{" "}
                      {item.max_guests} {item.sqft} sqft
                    </h5>
                    <br />
                    <br />
                    <br />
                    <h5 class="m-auto">${item.price} avg/night</h5>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log("Img", state.propertyImage.imageList);
  return {
    property_img: state.propertyImage.imageList
      ? state.propertyImage.imageList[0]
      : ""
  };
};

export default connect(
  mapStateToProps,
  { findPropertyImage, goToSingleProperty }
)(withRouter(PropertyItem));
