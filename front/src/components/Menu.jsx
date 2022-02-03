import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  return (
    <div className="menu-container">
      <ul className="menu-links">
        <li className="menu-link">
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            {" "}
            Home
          </NavLink>
        </li>
        <li className="menu-link">
          <NavLink
            to="/authors"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Authors
          </NavLink>
        </li>
        <li className="menu-link">
          <NavLink
            to="/books"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Books
          </NavLink>
        </li>
        <li className="menu-link">
          <NavLink
            to="/publishing_houses"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Publishing Houses
          </NavLink>
        </li>
      </ul>
      <div>
        <h4>My github: </h4>
        <p>https://github.com/ChleaBourtoule</p>
      </div>
    </div>
  );
};

export default Menu;
