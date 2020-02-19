import React from "react";
import "./import.css";
import { FileUpload } from "./fileupload.js";
import { Formatter } from "./formatter.js";
//import { InitButton } from "./initbutton.js";
import { ImportOption } from "./ImportOption.js";

const imports = {
  "Specify Format": <Formatter />,
  "Upload previous book lists": <FileUpload />
};

function ImportScreen() {
  return (
    <div className="import-container">
      {Object.keys(imports).map((step, i) => (
        <ImportOption
          stepNum={i + 1}
          dir={step}
          content={imports[step]}
        ></ImportOption>
      ))}
    </div>
  );
}

export default ImportScreen;
