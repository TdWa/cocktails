import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SearchCocktail() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(null);

  async function getSearchResults(search) {
    if (search === "") {
      return;
    }
    try {
      search = encodeURIComponent(search);
      const response = await axios.get(`
        https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}
        `);
      console.log("response:", response);
      console.log("response.data.drinks:", response.data.drinks);
      const result = response.data.drinks ? response.data.drinks : undefined;
      setData(result);
    } catch (e) {
      console.log("getSearchResults error:", e);
    }
  }

  const searchHandler = (e) => {
    e.preventDefault(); // do not resfresh, this is 2020
    getSearchResults(searchText);
    setSearchText("");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="cocktail name"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          required //not working anymore?
        ></input>
        <input onClick={searchHandler} type="submit"></input>
      </form>
      {data === null ? (
        <div></div>
      ) : data === undefined ? (
        <h3>No matches found</h3>
      ) : (
        <div>
          <h3>Search Results:</h3>
          <div className="cardContainer">
            {data
              ? data.map((drink) => {
                  return (
                    <div key={drink.idDrink} className="cardItem">
                      <Link to={`../cocktail/${drink.idDrink}`} target="_blank">
                        <p>{drink.strDrink}</p>
                        <img
                          className="cardImg"
                          src={drink.strDrinkThumb}
                          alt="coctail thumbnail"
                        />
                      </Link>
                    </div>
                  );
                })
              : "rendering..."}
          </div>
        </div>
      )}
    </div>
  );
}
