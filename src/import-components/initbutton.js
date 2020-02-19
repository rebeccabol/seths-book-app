import React from "react";
import "./import.css";

const instructions = "Select";
export class InitButton extends React.Component {
  render(props) {
    return (
      <div>
        <div className="instr">
          <div className="step">{this.props.step}</div>
          {instructions}
        </div>
        <div className="submit">
          <button className="btn" onClick={this.props.handle}>
            Parse
          </button>
        </div>
      </div>
    );
  }
}

export default InitButton;
