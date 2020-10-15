import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllCategories from "./pages/AllCategories";
import CategoryPage from "./pages/CategoryPage";
import CocktailPage from "./pages/CocktailPage";
import QuizPage from "./pages/QuizPage";
import NavBar from "./components/NavBar";
import "./main.css";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/cocktail/:id" component={CocktailPage} />
        <Route path="/categories/:coctail" component={CategoryPage} />
        <Route path="/categories" component={AllCategories} />
        <Route path="/quiz" component={QuizPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
