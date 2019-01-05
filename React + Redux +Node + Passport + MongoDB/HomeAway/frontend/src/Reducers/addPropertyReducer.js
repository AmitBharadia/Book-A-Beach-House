import { SHOW_PROPERTY_FORM, PROPERTY_ADDED_SUCEESS } from "../Actions";

export default function(state = {}, action) {
  // console.log("Action payload :", action.payload);
  switch (action.type) {
    case SHOW_PROPERTY_FORM:
      return Object.assign({}, state, {
        ...state,
        showForm: action.payload
      });
    case PROPERTY_ADDED_SUCEESS:
      return Object.assign({}, state, {
        ...state,
        redirect: action.payload
      });
    default:
      return state;
  }
}
