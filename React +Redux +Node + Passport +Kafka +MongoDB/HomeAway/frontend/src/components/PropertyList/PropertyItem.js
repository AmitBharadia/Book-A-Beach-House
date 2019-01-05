import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
class PropertyItem extends Component {
  constructor() {
    super();
    this.state = {
      property_img: "",
      propertyDetails: null
    };
  }
  componentDidMount(props) {
    // axios
    //   .get("http://localhost:3001/get-property-photos", {
    //     params: {
    //       location: this.props.property.location,
    //       headline: this.props.property.headline
    //     }
    //   })
    //   .then(res => {
    //     console.log("Status: " + res.status);
    //     if (res.status == 200) {
    //       console.log("Imgae Res : ", JSON.stringify(res.data));
    //       console.log("type of data", typeof res.data);
    //       this.setState({
    //         property_img: res.data[0]
    //       });
    //     }
    //   });
  }

  render() {
    var item = this.props.property;

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
    return (
      <div>
        <div>
          <br />
          <div
            class="card mt-3 "
            onM
            onClick={e => {
              console.log("asds");
              this.setState({
                propertyDetails: item
              });
            }}
          >
            <div class="row nopadding">
              <div class="col-5 nopadding ">
                <img
                  class="img-responsive"
                  src={"data:image/jpeg;base64," + this.state.property_img}
                />
              </div>
              <div class="card-list col-6 ">
                <div class="card-block nopadding ">
                  <h4 class="card-title ">{item.headline}</h4>
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

export default PropertyItem;
