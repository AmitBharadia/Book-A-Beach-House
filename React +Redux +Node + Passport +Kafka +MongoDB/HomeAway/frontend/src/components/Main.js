import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginOwner from "./Login/LoginOwner";
import SignupTraveller from "./Signup/SignupTraveller";
import LoginTraveller from "./Login/LoginTraveller";
import Home from "./Home/Home";
import PropertyList from "./PropertyList/PropertyList";
import Property from "./Property/Property";
import AddProperty from "./AddProperty/AddProperty";
import Profile from "./Profile/Profile";
import Trips from "./Trips/Trips";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/login-traveller" component={LoginTraveller} />
        <Route path="/login-owner" component={LoginOwner} />
        <Route path="/signup-traveller" component={SignupTraveller} />
        <Route path="/property-list" component={PropertyList} />
        <Route path="/home" component={Home} />
        <Route path="/property" component={Property} />
        <Route path="/add-property" component={AddProperty} />
        <Route path="/profile" component={Profile} />
        <Route path="/trips" component={Trips} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
