import React, { Component } from "react";
import "./SearchForm.css";

class SearchForm extends Component {
  render() {
    return (
      <div>
        <form id="form_input" class="form-inline bg-light fixed-top">
          <div class="form-group mx-sm-1 mb-2 pr-2">
            <label for="staticEmail2" class="sr-only">
              place
            </label>
            <input
              type="text"
              class="form-control js-destination js-launchModal tt-input"
              id="staticEmail2"
              disabled
              placeholder="Where do you want to go?"
            />
          </div>
          <div class="form-group mx-sm-1 mb-2 pr-2">
            <label for="staticEmail2" class="sr-only">
              Date
            </label>
            <input
              type="date"
              disabled
              class="form-control"
              id="staticEmail2"
              placeholder="Arrival"
            />
          </div>
          <div class="form-group mx-sm-1 mb-2 pr-2">
            <label for="staticEmail2" class="sr-only">
              Email
            </label>
            <input
              type="date"
              disabled
              class="form-control"
              id="staticEmail2"
              placeholder="Depart"
            />
          </div>
          <div class=" form-group mx-sm-1 mb-1">
            <div class="btn-group counter">
              <button
                disabled
                type="button"
                class="btn btn-default counter-button counter-button--gray js-decrement"
              >
                –
              </button>
              <input
                type="number"
                disabled
                class="form-control counter-value text-center js-count col-3 "
                value="0"
                name="adults"
              />
              <button
                disabled
                type="button"
                class="btn btn-default counter-button counter-button--gray js-increment"
              >
                +
              </button>
              <div class="pl-3" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchForm;
