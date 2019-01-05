import React, { Component } from "react";
import Navbar from "../Common/Navbar";
class Trips extends Component {
  render() {
    return (
      <div className="Trips">
        <Navbar />
        <ul class="nav nopadding border-bottom">
          <li class="pl-5 ml-5 nav-item">
            <a class="nav-link active" href="#">
              Profile
            </a>
          </li>
          <li class="pl-5 nav-item">
            <a class="nav-link" href="#">
              Your Trips
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Trips;
