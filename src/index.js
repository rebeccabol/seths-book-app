import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ImportScreen from "./import-components/ImportScreen.js";
import "./index.css";

const buttons = {
  import: "Import",
  list: "My Booklist",
  data: "Analytics"
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: "", error: "", info: false };
    this.updateCredentials.bind(this);
  }

  toggleInfoWindow = () => {
    console.log("here");
    this.setState({ info: !this.state.info });
  };

  updateCredentials = e => {
    this.setState({ token: e.target.value });
  };

  render() {
    return (
      <div className="login">
        <p className="h1">Welcome</p>
        <p className="h2">Enter your access key below.</p>
        <div className="entry">
          <input
            className="textfield"
            type="password"
            value={this.state.token}
            onChange={this.updateCredentials}
          ></input>
          <span className="space"></span>
          <button
            className="login-btn"
            onClick={() => this.props.onChange(this.state.token)}
          >
            Enter
          </button>
          <button className="tooltip" onClick={this.toggleInfoWindow}>
            <i className="material-icons" style={{ color: "green" }}>
              help
            </i>
            <span className="tooltiptext">How do I get access?</span>
          </button>
        </div>
        <div className="error">{this.props.error}</div>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access: false
    };
  }

  updateAccess = e => {
    if (e === "ok") {
      this.setState({ access: true });
    }
  };

  updateScreen = e => {
    if (this.state.access) {
      window.location.href = "/" + e.target.id;
      this.setState({ current: e.target.id });
    }
  };

  render() {
    return (
      <div>
        <div
          className="nav"
          style={this.state.access ? { opacity: 1 } : { opacity: 0.2 }}
        >
          <div className="nav-name">Bookeeper</div>
          {Object.keys(buttons).map(id => (
            <button
              id={id}
              key={id}
              className="nav-button"
              onClick={this.updateScreen}
            >
              {buttons[id]}
            </button>
          ))}
          <button className="nav-settings">
            <i className="material-icons" style={{ color: "white" }}>
              settings
            </i>
          </button>
        </div>
        <Router>
          <Route
            path="/"
            render={() =>
              this.state.access ? (
                <ImportScreen />
              ) : (
                <LoginScreen onChange={this.updateAccess} />
              )
            }
          />
          <Route path="/import" exact component={ImportScreen} />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
