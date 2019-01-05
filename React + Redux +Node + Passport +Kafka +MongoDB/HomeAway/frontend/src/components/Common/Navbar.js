import React, { Component } from "react";
import "./Navbar.css";
import cookie from "react-cookies";

class Navbar extends Component {
  render() {
    return (
      <div class="bg ">
        <div class="">
          <div class="HeroImage_effects  pt-5 pb-5">
            <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light mr">
              <a class="navbar-brand" href="#">
                <img
                  class="pl-5 img-responsive"
                  src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"
                />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon" />
              </button>
              <div
                class="collapse navbar-collapse "
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <a class="nav-link text-primary" href="#">
                      Trip boards <span class="sr-only">(current)</span>
                    </a>
                  </li>
                  <li class="nav-item dropdown text-light pl-5">
                    <a
                      class="nav-link dropdown-toggle text-primary"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {cookie.load("name")}
                    </a>
                    <div
                      class="dropdown-menu text-white "
                      aria-labelledby="navbarDropdown"
                    >
                      <a class="dropdown-item text-primary pt-3" href="#">
                        My Profile
                      </a>
                      <a class="dropdown-item text-primary pt-4" href="#">
                        Log Out
                      </a>
                    </div>
                  </li>

                  <li class="nav-item dropdown pl-5">
                    <a
                      class="nav-link dropdown-toggle .text-primary pr-5"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Help
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item text-primary pt-3" href="#">
                        Visit help center
                      </a>
                      <div class="dropdown-divider" />
                      <a class="dropdown-item text-primary pt-3" href="#">
                        Traveller
                      </a>
                      <a class="dropdown-item text-primary pt-3" href="#">
                        How it works
                      </a>
                      <a class="dropdown-item text-primary pt-3" href="#">
                        Security
                      </a>
                    </div>
                  </li>
                </ul>

                {cookie.load("cookie") == "owner" && (
                  <button
                    id="listProperty"
                    type="button"
                    class="btn btn-lightbtn btn-light btn-sm"
                  >
                    List your Property
                  </button>
                )}
                <div class="navbar-brand ml-auto">
                  <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
