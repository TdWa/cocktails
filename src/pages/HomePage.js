import React from "react";
import SearchCocktail from "../components/SearchCocktail";

export default function HomePage() {
  return (
    <div>
      <h2>Home page</h2>
      <p>This is a website to do cocktail things</p>
      <p>
        Go to Cocktail Categories in the header menu <br></br>
        <br></br> Or search for Cocktail by name below!
      </p>
      <SearchCocktail />
    </div>
  );
}
