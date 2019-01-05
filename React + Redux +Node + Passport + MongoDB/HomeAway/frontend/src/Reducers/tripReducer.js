import { TRIP_HISTORY_FOUND } from "./../Actions";

export default function(state = {}, action) {
  //console.log("Action :" + action.type);
  switch (action.type) {
    case TRIP_HISTORY_FOUND:
      return {
        ...state,
        details: action.payload
      };
    default:
      return state;
  }
}
