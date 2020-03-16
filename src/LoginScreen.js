import React, { Component } from "react";
import * as d3 from "d3";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "", windowOpen: false };
    this.updateCredentials.bind(this);
  }

  attemptLogin = e => {
    this.props.onAttempt(this.state.token);
  };

  toggleInfoWindow = () => {
    d3.select("#info")
      .transition()
      .duration(500)
      .style("visibility", this.state.info ? "hidden" : "visible")
      .style("height", this.state.info ? "0px" : "50px");
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
        <div className="entry-row">
          <input
            className="textfield"
            type="password"
            value={this.token}
            onChange={this.updateCredentials}
          ></input>
          <span />
          <button className="btn" onClick={this.attemptLogin}>
            Enter
          </button>
          <button className="tooltip" onClick={this.toggleInfoWindow}>
            <i className="material-icons">help</i>
            <span className="tooltiptext">How do I get access?</span>
            <span id="info" className="infobox">
              This app is currently only availble to Seth.
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
