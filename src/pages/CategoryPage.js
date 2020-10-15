import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CategoryPage.css";

export default function CategoryPage() {
  const param = useParams().coctail.replace(/_/g, "/");
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("CategoryPage useEffect");

    async function getCoctails() {
      try {
        const categoryNoSpace = param.replace(/ /g, "_");
        const encodedCategory = encodeURIComponent(categoryNoSpace);
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodedCategory}`
        );
        console.log(response.data.drinks);
        setData(response.data.drinks);
      } catch (e) {
        console.log("error after trying to fetch data", e);
      }
    }
    getCoctails();
  }, [param]);

  return (
    <div id="CategoryPage">
      <h2>Category: {param}</h2>
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
  );
}
