import React from "react";
import "./import.css";

const range = possibleYears();
const accepted = ["text", "pdf", "document"];
const success = <i className="material-icons anim" style={{ color: "green" }}>
check_circle
</i>;
const failure = <i className="material-icons anim" style={{ color: "red" }}>
error
</i>;

function possibleYears() {
  let current_yr = new Date().getFullYear();
  return Array.from(new Array(100), (x, i) => current_yr - i);
}

export class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      status : "",
      error: "", 
    };
  }

  updateYear = e => {
    this.setState({ year: e.target.value });
  };

  onUpload = e => {
    let file = e.target.files[0];
    if (file !== undefined) {
    let status = failure,
    error="Must be .pdf, .docx, or .txt file";
    accepted.forEach(t => {
      if (file.type.includes(t)) {
        status = success;
        error = "";
      }
    });
    this.setState({ status: status, error : error });
  };
  }

  render() {
    return (
      <div className="upload-entry">
        <div className="upload-form">
          <div className="status">{this.state.status}</div>
        <select id={this.id} className="dropdown" onChange={this.updateYear}>
          <option value="year" selected>Year</option>
          {range.map(i => (
            <option key={i}>{i}</option>
          ))}
        </select>

          <input
            id={this.id}
            type="file"
            onChange={this.onUpload.bind(this)}
          />
        <span className="error">{this.state.error}</span>
        </div>
        {this.props.first ? 
        <button className="file-upload-add" onClick={this.props.add}>
          <i className="material-icons add">add_circle</i>
        </button>
        : <div className="file-upload-add" onClick={this.props.remove}>
          <i className="material-icons remove">remove_circle</i>
        </div>
  }
        </div>
    );
  }
}

export default InputField;
