import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function QuizPage() {
  const [data, setData] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [img, setImg] = useState("");

  const handleAnswer = (e) => {
    e.preventDefault(); // do not resfresh, this is 2020
    if (
      !document.getElementById("answer1").checked &&
      !document.getElementById("answer2").checked &&
      !document.getElementById("answer3").checked
    ) {
      return;
    }

    const imgSource = document.getElementById("quizImg").getAttribute("src");
    const correct = data.indexOf(imgSource);
    console.log(imgSource, correct);

    if (correct === 2 && document.getElementById("answer1").checked) {
      setFeedback(
        <h3 style={{ color: "green" }} className="feedback">
          Correct!
        </h3>
      );
    } else if (correct === 5 && document.getElementById("answer2").checked) {
      setFeedback(
        <h3 style={{ color: "green" }} className="feedback">
          Correct!
        </h3>
      );
    } else if (correct === 8 && document.getElementById("answer3").checked) {
      setFeedback(
        <h3 style={{ color: "green" }} className="feedback">
          Correct!
        </h3>
      );
    } else {
      setFeedback(
        <h3 style={{ color: "red" }} className="feedback">
          Wrong! The answer was {data[correct - 1]}!
        </h3>
      );
    }
  };

  const getNewQuestion = (e) => {
    e.preventDefault(); // do not resfresh, this is 2020

    async function getRandomCoctails() {
      const options = [];

      while (options.length < 9) {
        try {
          const response = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/random.php`
          );
          const drink = response.data.drinks[0];
          console.log("checking drink", drink.idDrink);

          if (!options.includes(drink.strDrink)) {
            options.push(drink.idDrink);
            options.push(drink.strDrink);
            options.push(drink.strDrinkThumb);
          }
        } catch (e) {
          console.log("error from getRandomCoctails", e);
          options.push(Math.random());
        }
      }
      console.log(options);
      setData(options);
      setImg(options[[2, 5, 8][Math.floor(Math.random() * 3)]]);
    }
    getRandomCoctails();
    setFeedback("");

    const radioButtons = document.getElementsByName("answer");
    for (let i = 0; i < radioButtons.length; i++)
      radioButtons[i].checked = false;
  };

  return (
    <div id="quizPage">
      <h2>Welcome to Quiz</h2>
      <p>What is the name of the drink on the picture?</p>
      <form>
        <input
          onClick={getNewQuestion}
          type="submit"
          value={img ? "Next" : "Start"}
        ></input>
        <br></br>
        <br></br>
        {img ? (
          <div>
            <input
              type="radio"
              id="answer1"
              name="answer"
              value="answer1"
            ></input>
            <label htmlFor="answer1">
              {data ? data[1] : "Rendering / Error"}
            </label>
            <br></br>
            <input
              type="radio"
              id="answer2"
              name="answer"
              value="answer2"
            ></input>
            <label htmlFor="answer2">
              {data ? data[4] : "Rendering / Error"}
            </label>
            <br></br>
            <input
              type="radio"
              id="answer3"
              name="answer"
              value="answer3"
            ></input>
            <label htmlFor="answer3">
              {data ? data[7] : "Rendering / Error"}
            </label>
            <br></br>
            <br></br>
            {feedback === "" ? (
              <input onClick={handleAnswer} type="submit"></input>
            ) : (
              <div></div>
            )}
            <br></br>
            <br></br>
          </div>
        ) : (
          <div></div>
        )}
      </form>
      <div>{feedback ? feedback : ""}</div>
      {img ? <img id="quizImg" src={img} alt="coctail" /> : <div></div>}
      {feedback ? <h3>Learn more about these drinks...</h3> : <div></div>}
      <div className="cardContainer">
        {feedback
          ? [
              [...data.slice(0, 3)],
              [...data.slice(3, 6)],
              [...data.slice(6)],
            ].map((drink) => {
              return (
                <div key={drink[0]} className="cardItem">
                  <Link to={`../cocktail/${drink[0]}`} target="_blank">
                    <p>{drink[1]}</p>
                    <img
                      className="cardImg"
                      src={drink[2]}
                      alt="coctail thumbnail"
                    />
                  </Link>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
