import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import tripReducer from "./tripReducer";
import propertListReducer from "./propertyListReducer";
import propertyImageReducer from "./propertyImageReducer";
import addPropertyReducer from "./addPropertyReducer";
import bookPropertyReducer from "./bookPropertyReducer";
const rootReducer = combineReducers({
  form: formReducer,
  login: loginReducer,
  signup: signupReducer,
  trips: tripReducer,
  property: propertListReducer,
  propertyImage: propertyImageReducer,
  addProperty: addPropertyReducer,
  bookproperty: bookPropertyReducer
});

export default rootReducer;
