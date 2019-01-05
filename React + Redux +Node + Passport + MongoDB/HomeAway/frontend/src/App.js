import "./App.css";
import Main from "./components/Main";
import React, { Component } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import Thunk from "redux-thunk";

//Redux app imports
import RootReducer from "./Reducers";
import Home from "./components/Home/Home";
import LoginTraveler from "./components/Login/LoginTraveller";
import LoginOwner from "./components/Login/LoginOwner";
import SignupTraveller from "./components/Signup/SignupTraveller";
import SignupOwner from "./components/Signup/SignupOwner";
import PropertyList from "./components/PropertyList/PropertyList";
import Property from "./components/Property/Property";
import AddProperty from "./components/AddProperty/AddProperty";
import Profile from "./components/Profile/Profile";
import Trips from "./components/Trips/Trips";

//Middleware settings
//Resolves promise to store
const composePlugin =
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;
const createStoreWithMiddleware = applyMiddleware(promise, Thunk)(createStore);
const store = createStoreWithMiddleware(RootReducer, composePlugin);

//App Component
class App extends Component {
  render() {
    /*store.subscribe(() => {
      console.log("Store Updated :" + JSON.stringify(store.getState()));
    });*/

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login-traveller" component={LoginTraveler} />
            <Route path="/home" component={Home} />
            <Route path="/login-owner" component={LoginOwner} />
            <Route path="/signup-traveller" component={SignupTraveller} />
            <Route path="/signup-owner" component={SignupOwner} />
            <Route path="/property-list" component={PropertyList} />
            <Route path="/property" component={Property} />
            <Route path="/add-property" component={AddProperty} />
            <Route path="/profile" component={Profile} />
            <Route path="/trips" component={Trips} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
