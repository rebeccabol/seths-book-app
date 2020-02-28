import React, {Component} from "react";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { token : "", windowOpen : false};
    this.updateCredentials.bind(this);
  }

  attemptLogin = (e) => {
    this.props.onAttempt(this.state.token);
  }

  toggleInfoWindow = () => {
    this.setState({ info: !this.state.info });
  };

  updateCredentials = e => {
    this.setState({token : e.target.value});
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
            value={this.token}
            onChange={this.updateCredentials}
          ></input>
          <span className="space"></span>
          <button
            className="login-btn"
            onClick={this.attemptLogin}
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

export default LoginScreen;