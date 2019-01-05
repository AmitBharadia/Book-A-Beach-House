import { LOGIN_SUCCESS } from "../Actions";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target
    case LOGIN_SUCCESS:
      console.log("Action: " + JSON.stringify(action));
      return {
        ...state,
        authLogin: action.payload
      };
    default:
      return state;
  }
}
