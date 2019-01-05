import {
  PROPERTY_FOUND,
  SINGLE_PROPERTY_INDEX,
  PAGE_INDEX_SET
} from "./../Actions";

export default function(state = {}, action) {
  console.log("Action Payload", JSON.stringify(action.payload));

  switch (action.type) {
    case PROPERTY_FOUND:
      return Object.assign({}, state, {
        ...state,
        details: action.payload,
        redirect: "propertyList",
        currentPageIndex: 1
      });
    case PAGE_INDEX_SET:
      return Object.assign({}, state, {
        ...state,
        currentPageIndex: action.payload
      });
    case SINGLE_PROPERTY_INDEX:
      return Object.assign({}, state, {
        ...state,
        curr_prop_id: action.payload
      });
    default:
      return state;
  }
}
