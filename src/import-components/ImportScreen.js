import React, { Component } from "react";
import "./import.css";
import { FileUpload } from "./fileupload.js";
import { Formatter } from "./formatter.js";

export class ImportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: true
    };
  }
  changeMenu = e => {
    this.setState({ format: e.target.id === "format" });
  };

  resize = div => {
    let content = document.getElementById(div);
    content.style.maxHeight = content.scrollHeight + 100 + "px";
  };

  render() {
    return (
      <div className="import-container">
        <button id="format" className="tab" onClick={this.changeMenu}>
          1. Specify formatting
        </button>
        <button id="upload" className="tab" onClick={this.changeMenu}>
          2. Upload Files
        </button>
        <div className="import-content">
          {this.state.format ? (
            <Formatter />
          ) : (
            <FileUpload onChange={this.resize} />
          )}
        </div>
        <button className="import-btn">Import</button>
      </div>
    );
  }
}

export default ImportScreen;
