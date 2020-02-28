import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import ImportScreen from "./import-components/ImportScreen.js";
import LoginScreen from "./LoginScreen.js";
import "./index.css";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auth : false}
  }
  

  login = e => {
    if (e === "ok") {
      this.setState({auth : true});
    }
  }

  render() {
    return (
        <Router>
          <Route exact path="/"> {this.state.auth ? <Redirect to="/import"/> : <LoginScreen onAttempt={this.login}/>} </Route>
          <Route path="/home"><ImportScreen/></Route>
          <Route path="/import"><ImportScreen/></Route>
          <Route path="/data"><ImportScreen/></Route>
        </Router>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));