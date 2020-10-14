import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AllCategories.css";

export default function AllCategories() {
  console.log("a render");

  const routeParameter = useParams();
  const [data, setData] = useState(null);

  console.log("routeParameter:", routeParameter);

  useEffect(() => {
    console.log("Use effect happening now");

    async function getCoctails() {
      try {
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
        );

        console.log("checking response.data.drinks", response.data.drinks);

        setData(response.data.drinks);
      } catch (e) {
        console.log("checking error:", e);
      }
    }
    getCoctails();
  }, []);

  return (
    <div>
      <h2>All categories:</h2>
      {data ? (
        data.map((category) => {
          return (
            <div key={category.strCategory}>
              <Link
                to={`categories/${category.strCategory.replace(
                  /[/]/g,
                  " or "
                )}`}
                target="_blank"
              >
                <div className="category">{category.strCategory}</div>
              </Link>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
