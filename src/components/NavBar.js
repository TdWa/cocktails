import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header>
      <h1>Cocktail Stuff</h1>
      <nav>
        <NavLink className="link" exact={true} to="/">
          Home
        </NavLink>
        <br></br>
        <NavLink className="link" exact={true} to="/categories">
          Cocktail Categories
        </NavLink>
        <br></br>
        <NavLink className="link" exact={true} to="/quiz">
          Quiz
        </NavLink>
      </nav>
    </header>
  );
}
