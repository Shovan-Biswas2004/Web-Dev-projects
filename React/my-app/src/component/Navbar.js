import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg  navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success mx-2" type="submit">
              Search
            </button>
          </form>
          <div className={`form-check form-switch mx-3 text-${props.mode === "light"?"dark":"light"}`}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
              onClick={props.toggleMode}
            />
            <label className="form-check-label" htmlFor="switchCheckDefault">
              Enable Dark mode
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
// prop types used to lock the type of the prop
Navbar.propTypes = { title: PropTypes.string };
