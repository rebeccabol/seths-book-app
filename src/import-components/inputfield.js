import React from "react";
import "./import.css";

const range = possibleYears();
const accepted = ["text", "pdf", "document"];
const icons = {
  failure: (
    <i className="material-icons anim" style={{ color: "red" }}>
      error
    </i>
  ),
  success: (
    <i className="material-icons anim" style={{ color: "green" }}>
      check_circle
    </i>
  )
};

function possibleYears() {
  let current_yr = new Date().getFullYear();
  return Array.from(new Array(100), (x, i) => current_yr - i);
}

export class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      year: possibleYears[0],
      progress: "success"
    };
  }

  updateYear = e => {
    this.setState({ year: e.target.value });
  };

  onUpload = e => {
    var el = React.findDOMNode(this);
    setTimeout(function() {
      el.classList.remove("class1");
    }, 1000);
    this.setState({ progress: "waiting" });
    this.render();
    let file = e.target.files[0];
    let status = "failure";
    accepted.forEach(t => {
      if (file.type.includes(t)) {
        status = "success";
      }
    });
    this.setState({ progress: status });
    console.log(status);
  };

  render() {
    console.log(this.state.progress);
    return (
      <div className="input-container">
        <select className="dropdown" onChange={this.updateYear}>
          {range.map(i => (
            <option key={i}>{i}</option>
          ))}
        </select>
        <div className="file">
          hello
          <input
            type="file"
            className="file"
            onChange={this.onUpload.bind(this)}
          />
        </div>
        <div className="status">{icons[this.state.progress]}</div>
      </div>
    );
  }
}

export default InputField;
