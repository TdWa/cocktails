import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SearchCocktail() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [resultText, setResultText] = useState("");

  async function getSearchResults(search, type) {
    if (search === "") {
      return;
    }
    try {
      search = encodeURIComponent(search);
      const response =
        type === "name"
          ? await axios.get(`
        https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}
        `)
          : await axios.get(`
          https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}
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
    getSearchResults(searchText, searchType);
    setResultText(searchText);
    setSearchText("");
  };

  return (
    <div>
      <form>
        <label htmlFor="searchType">Search by:</label>
        <select
          onChange={(e) => setSearchType(e.target.value)}
          name="select"
          id="searchType"
        >
          <option value="name">Name</option>
          <option value="ingredient">Ingredient</option>
        </select>{" "}
        (It seems ingredient search only works for some common ones and it must
        be fully spelled out, search by name can be partial)
        <br></br>
        <br></br>
        <input
          type="text"
          placeholder={searchType === "name" ? "cocktail name" : "ingredient"}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          required //not working anymore?
        ></input>
        <input onClick={searchHandler} type="submit" value="Search"></input>
      </form>
      {data === null ? (
        <div></div>
      ) : data === undefined ? (
        <h3>{`No matches found for "${resultText}"`}</h3>
      ) : (
        <div>
          <h3>{`Search results for "${resultText}":`}</h3>
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
