import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuizPage() {
  const [data, setData] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
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
    }
    getRandomCoctails();
  }, []);

  const handleAnswer = (e) => {
    e.preventDefault(); // do not resfresh, this is 2020
    const imgSource = document.getElementById("quizImg").getAttribute("src");
    const correct = data.indexOf(imgSource);
    console.log(imgSource, correct);

    if (correct === 2 && document.getElementById("answer1").checked) {
      setFeedback(<span>Correct!</span>);
    } else if (correct === 5 && document.getElementById("answer2").checked) {
      setFeedback(<span>Correct!</span>);
    } else if (correct === 8 && document.getElementById("answer3").checked) {
      setFeedback(<span>Correct!</span>);
    } else {
      setFeedback(
        <span>
          wrong :(<br></br>The answer was {data[correct - 1]}
        </span>
      );
    }
  };

  const getNewQuestion = (e) => {
    e.preventDefault(); // do not resfresh, this is 2020
    setImg(data[[2, 5, 8][Math.floor(Math.random() * 3)]]);
  };

  return (
    <div>
      <h2>Welcome to Quiz</h2>
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
              {data ? data[0] : "Rendering / Error"}
            </label>
            <br></br>
            <input
              type="radio"
              id="answer2"
              name="answer"
              value="answer2"
            ></input>
            <label htmlFor="answer2">
              {data ? data[2] : "Rendering / Error"}
            </label>
            <br></br>
            <input
              type="radio"
              id="answer3"
              name="answer"
              value="answer3"
            ></input>
            <label htmlFor="answer3">
              {data ? data[4] : "Rendering / Error"}
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
      {img ? <img id="quizImg" src={img} alt="coctail" /> : <div></div>}
      <p>{feedback ? feedback : ""}</p>
      <p>
        to do: 1) make the quiz work properly, 2) put links to the pages of the
        three cocktails so you can check them out
      </p>
    </div>
  );
}

/*
if(document.getElementById('gender_Male').checked) {
  //Male radio button is checked
}else if(document.getElementById('gender_Female').checked) {
  //Female radio button is checked
}


data[[1, 3, 5][Math.floor(Math.random() * 3)]]
*/
