import React, { Component } from "react";
import "./import.css";

export class ImportOption extends Component {
  constructor(props) {
    super(props);
    this.id = props.stepNum;
    this.directions = props.dir;
    this.state = {
      collapsed: true
    };
  }

  collapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    console.log("here");
    return (
      <div className="dropdown">
        <div className="header">
          <div className="step">{this.id}</div>
          {this.directions}
          <span></span>
          <button className="toggle" onClick={this.collapse}>
            V
          </button>
        </div>
        <div
          className="dropdown-content"
          style={
            this.state.collapsed
              ? { visibility: "collapse" }
              : { visibility: "visible" }
          }
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default ImportOption;
