import React from "react";
import { InputField } from "./inputfield.js";

export class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: {},
      forms: [<InputField index={0} add={this.addInputField} first={true}></InputField>],
      count: 1,
      header : ""
    };
  }

  addInputField = () => {
    let arr = this.state.forms;
    arr.push(<InputField index={this.state.count} add={this.addInputField} remove={this.removeInputField.bind(this, this.state.count)}/>);
    this.setState({ forms: arr, count: this.state.count + 1 });
    this.props.onChange("opt-2-content");
  };

  removeInputField = (e) => {
    console.log(e);
    let arr = this.state.forms;
    arr.splice(e, 1);
    this.setState({ forms: arr, count: this.state.count - 1 });
    this.props.onChange("opt-2-content");
  }

  render() {
    return (
        <div className="file-upload-container">
          <p> Upload </p>
            {this.state.forms.map((d) => d)}
        </div>
    );
  }
}

export default FileUpload;
