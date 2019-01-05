import { PROPERTY_IMAGE_FOUND } from "./../Actions";

export default function(state = {}, action) {
  switch (action.type) {
    case PROPERTY_IMAGE_FOUND:
      return Object.assign({}, state, {
        ...state,
        imageList: action.payload
      });
    default:
      return state;
  }
}
