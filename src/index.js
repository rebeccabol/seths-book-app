import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import ImportScreen from "./import-components/ImportScreen.js";
import LoginScreen from "./LoginScreen.js";
import TableScreen from "./TableScreen.js";
import "./index.css";

function tableEntry(title, author, genre, rating, year) {
  return {
    title: title,
    author: author,
    genre: genre,
    rating: rating,
    year_read: year
  };
}
const sampleData = [
  tableEntry("Coraline", "Neil Gaimain", "Fantasy", 0.9, 2010),
  tableEntry("Ready Player One", "RL Stine", "SciFi", 0.79, 2017),
  tableEntry("Harry Potter", "JK Rowling", "Fantasy", 0.8, 2000)
];

const emptyList = [];
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auth: false };
  }

  login = e => {
    if (e === "ok") {
      this.setState({ auth: true });
    }
  };

  render() {
    console.log(this.state.importMenuOpen);
    return (
      <Router>
        <Route exact path="/">
          {" "}
          {this.state.auth ? (
            <Redirect to="/import" />
          ) : (
            <LoginScreen onAttempt={this.login} />
          )}{" "}
        </Route>
        <Route path="/list">
          <TableScreen
            data={sampleData}
            container="#root"
          ></TableScreen>
        </Route>
        <Route path="/data"></Route>
      </Router>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
