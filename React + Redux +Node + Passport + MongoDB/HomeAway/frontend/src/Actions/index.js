import axios from "axios";

export const LOGIN_SUCCESS = "loginSuccess";
export const SIGNUP_SUCCESS = "signupSuccess";
export const TRIP_HISTORY_FOUND = "foundTripHistory";
export const PROPERTY_FOUND = "foundProperty";
export const PROPERTY_IMAGE_FOUND = "findImgesOfProperty";
export const PROPERTY_ADDED_SUCEESS = "addProperty";
export const SHOW_PROPERTY_FORM = "showPropertyFrom";
export const SINGLE_PROPERTY_INDEX = "singleProperty";
export const BOOK_PROPERTY_SUCCESS = "bookProperty";
export const PAGE_INDEX_SET = "setPageIndex";

const ROOT_URL = "http://18.225.33.155:3001";

axios.defaults.withCredentials = true;

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

//Target Action
export function authTraveller(values) {
  return (dispatch, getState) => {
    axios.post(`${ROOT_URL}/login-traveller`, values).then(response => {
      console.log("Response recieved: " + JSON.stringify(response.data.auth));
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.auth
      });
      console.log("Get state : " + JSON.stringify(getState()));
    });
  };
}

export function signup(values) {
  console.log("values :" + values);

  return dispatch => {
    axios.post(`${ROOT_URL}/signup-traveller`, values).then(res => {
      console.log("Response Status", res.status);
      console.log("Response Data", JSON.stringify(res.data));
      if (res.status == 200) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data.auth
        });
      }
    });
  };
}

export function fetchTripHistory() {
  console.log("Action called Trip Historty");
  return dispatch => {
    axios.get(`${ROOT_URL}/trip-history`).then(res => {
      console.log("Response Status", res.status);
      console.log("Response Data", JSON.stringify(res.data));
      if (res.status == 200) {
        dispatch({
          type: TRIP_HISTORY_FOUND,
          payload: res.data
        });
      }
    });
  };
}

export function searchProperty(values) {
  console.log("Action called Search Property");
  return dispatch => {
    axios.get(`${ROOT_URL}/search`, { params: values }).then(res => {
      console.log("Response Status", res.status);
      console.log("Response Data", JSON.stringify(res.data));

      if (res.status == 200) {
        dispatch({
          type: PROPERTY_FOUND,
          payload: res.data
        });
      }
    });
  };
}

export function findPropertyImage(value) {
  console.log("Action called find Property Image", JSON.stringify(value));
  return dispatch => {
    axios
      .get(`${ROOT_URL}/get-property-photos`, { params: value })
      .then(res => {
        console.log("Response Status", res.status);
      //  console.log("Response Data", JSON.stringify(res.data));
        if (res.status == 200) {
          dispatch({
            type: PROPERTY_IMAGE_FOUND,
            payload: res.data
          });
        }
      });
  };
}

export function showPropertyForm(value) {
  console.log("Action caller for show property form :", value);
  return dispatch =>
    dispatch({
      type: SHOW_PROPERTY_FORM,
      payload: value
    });
}

export function updatePageIndex(value) {
  console.log("Action caller for update page Index :", value);
  return dispatch =>
    dispatch({
      type: PAGE_INDEX_SET,
      payload: value
    });
}

export function goToSingleProperty(value) {
  console.log("Action caller for showing single property:", value);
  return dispatch =>
    dispatch({
      type: SINGLE_PROPERTY_INDEX,
      payload: value
    });
}
export function addNewProperty(values) {
  console.log("Action called for adding new property", values);

  return dispatch => {
    axios
      .post(`${ROOT_URL}/add-property`, values, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log("Response Status", res.status);
        console.log("Response Data", JSON.stringify(res.data));
        if (res.status == 200 && res.data) {
          dispatch({
            type: PROPERTY_ADDED_SUCEESS,
            payload: res.data.auth
          });
        }
      });
  };
}

export function findPropertyImage1(value) {
  console.log("Action called find Property Image", JSON.stringify(value));
  return (dispatch, getState) => {
    /* axios
      .get(`${ROOT_URL}/get-property-photos`)
      .then(res => {
        console.log("Response status :", res.status);
        console.log("Response data :", res.data);
        if (res.status == 200) {
          dispatch({
            type: PROPERTY_IMAGE_FOUND,
            payload: res.data
          });
        }
      })
      .catch(error => {
        console.log("Error occured : ", error);
      });*/
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: true
    });

    console.log("property updated : ", getState());
  };
}

export function bookProperty(values) {
  return dispatch => {
    axios.post(`${ROOT_URL}/book-property`, values).then(res => {
      console.log("Response status :", res.status);
      console.log("Response body: ", res.data);
      if (res.status == 200 && res.data) {
        dispatch({
          type: BOOK_PROPERTY_SUCCESS,
          payload: res.data.auth
        });
      }
    });
  };
}
