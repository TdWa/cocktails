import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllCategories from "./pages/AllCategories";
import CategoryPage from "./pages/CategoryPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/categories/:coctail" component={CategoryPage} />
        <Route path="/categories" component={AllCategories} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
