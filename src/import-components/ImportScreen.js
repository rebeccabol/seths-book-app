import React, { Component } from "react";
import "./import.css";
import { FileUpload } from "./fileupload.js";
import { Formatter } from "./formatter.js";
//import { InitButton } from "./initbutton.js";

const down = <i class="material-icons">
arrow_drop_down
</i>;

export class ImportScreen extends Component {

  collapse = e => {
    let content = document.getElementById(e.target.id + "-content");
    document.getElementById(e.target.id).classList.toggle("active");
    document.getElementById(e.target.id).content = down;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  resize = div => {
    let content = document.getElementById(div);
    content.style.maxHeight = content.scrollHeight + 100 + "px";
  }

  render() {
    return (
      <div className="grid">
        <div className="header">Import</div>
        <div className="import-container" grid-area="cen">
        <button id="opt-1" className="collapsible" onClick={this.collapse}>
            1. Specify formatting
         </button>
          <div id="opt-1-content" className="content">
            <Formatter/>
          </div>
          <br></br>
          <button id="opt-2" className="collapsible" onClick={this.collapse}>
            2. Upload Files
         </button>
          <div id="opt-2-content" className="content">
            <FileUpload onChange={this.resize}/>
            </div>
            </div>
          <div grid-area="r">hello</div>
        </div>
    );
  }
}

export default ImportScreen;
