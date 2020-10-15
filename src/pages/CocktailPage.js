import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CocktailPage.css";

export default function CocktailPage() {
  const [data, setData] = useState(null);
  const param = useParams().id;
  console.log("param:", param);

  useEffect(() => {
    console.log("CocktailPage useEffect starting!");
    async function getCocktailInfo() {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${param}`
        );
        const info = Object.entries(response.data.drinks[0]);
        console.log(info);

        setData(info);
      } catch (e) {
        console.log("error from getCocktailInfo!", e);
      }
    }
    getCocktailInfo();
  }, [param]);

  return (
    <div id="cocktailPage">
      <h2>{data ? data[1][1] : "Loading... / Error"}</h2>
      <div>
        {data ? (
          <div>
            <img src={data[20][1]} alt="cocktail" />
            <div className="container">
              <p>
                <strong>Category:</strong> {data[10][1]}
              </p>
              <p>
                <strong>Alcoholic?</strong>{" "}
                {data[12][1] === "Alcoholic" ? "Yes" : "No"}
              </p>
              <p>
                <strong>Glass type:</strong> {data[13][1]}
              </p>
              <p>
                <strong>Instructions:</strong>
                <br></br>
                {data[14][1]}
              </p>
              <p>
                <strong>Ingredients:</strong>
              </p>
              {data
                .filter((array) => {
                  return array[0].match("Ingredient") && array[1];
                })
                .map((ingredient, i) => {
                  return (
                    <p key={ingredient[1]}>
                      <strong>{i + 1}:</strong> {ingredient[1]}
                    </p>
                  );
                })}
            </div>
          </div>
        ) : (
          "Rendering... / Error"
        )}
      </div>
    </div>
  );
}
