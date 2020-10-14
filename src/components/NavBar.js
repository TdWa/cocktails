import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header>
      <h1>Welcome</h1>
      <NavLink exact={true} to="/">
        Home
      </NavLink>
      <br></br>
      <NavLink exact={true} to="/categories">
        Cocktail Categories
      </NavLink>
    </header>
  );
}
