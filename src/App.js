import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styles from "./App.css";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/changepassword" exact component={MainPage} />
          <Route path="/" exact component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
