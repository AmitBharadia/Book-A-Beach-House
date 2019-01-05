import { SIGNUP_SUCCESS } from "./../Actions";

export default function(state = {}, action) {
  //console.log("Action Type : ", action.type);
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authSignup: action.payload
      };
    default:
      return state;
  }
}
