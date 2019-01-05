import { BOOK_PROPERTY_SUCCESS } from "./../Actions";

export default function(state = {}, action) {
  switch (action.type) {
    case BOOK_PROPERTY_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        redirectFlag: action.payload
      });
    default:
      return state;
  }
}
