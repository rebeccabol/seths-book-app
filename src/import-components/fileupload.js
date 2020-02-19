import React from "react";
import { InputField } from "./inputfield.js";

const instructions = "Upload previous book lists that adhere to your format.";
export class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: {},
      forms: [<InputField key="uid-0" />],
      count: 1
    };
  }

  addInputField = () => {
    let arr = this.state.forms;
    arr.push(<InputField key={this.state.count} />);
    this.setState({ forms: arr, count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="panel">
        <div key className="instr">
          <div className="step">{this.props.step}</div>
          {instructions}
        </div>
        <div className="file-upload-container">
          <div key="ui-3" className="input-shelf">
            {this.state.forms}
          </div>
          <button onClick={this.addInputField}>add more files</button>
        </div>
      </div>
    );
  }
}

export default FileUpload;
