import React, { Component } from "react";
import * as d3 from "d3";
import lottie from "lottie-web";
import "./list.css";
import animation from "./872-empty-list.json";
import ImportScreen from "./import-components/ImportScreen.js";

const toolbar = [
  { icon: "add", label: "Add" },
  { icon: "edit", label: "Edit" },
  { icon: "filter_list", label: "Filter" },
  { icon: "input", label: "Import" },
  { icon: "share", label: "Share" }
];

class TableScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      searchEntry: "",
      selection: ""
    };
  }

  componentDidMount() {
    let table = d3.select("#main-table").append("table");

    table
      .append("thead")
      .selectAll("th")
      .data(Object.keys(this.state.data[0]))
      .join("th")
      .text(d => d);

    let rows = table
      .selectAll("tr")
      .data(this.state.data)
      .attr("height", "20px")
      .join("tr");

    rows
      .selectAll("td")
      .data(d => Object.entries(d))
      .join("td")
      .text(d => d[1]);
  }
  updateSearch = e => {
    this.setState({ searchEntry: e.target.value });
  };

  openMenu = e => {
    this.setState({ selection: e });
  };

  render() {
    return (
      <div className="table-container">
        <div className="toolbar">
          {toolbar.map(val => (
            <button
              className="opt-btn"
              key={val.label}
              onClick={e => this.openMenu(val.label)}
            >
              <i className="material-icons">{val.icon}</i>
              <span>{val.label}</span>
            </button>
          ))}
        </div>
        <div className="action">
          {this.state.selection === "Import" ? (
            <ImportScreen />
          ) : (
            <input
              className="searchfield"
              type="text"
              value={this.state.searchEntry}
              onChange={this.updateSearch}
            ></input>
          )}
        </div>
        <div className="main-table" id="main-table"></div>
      </div>
    );
  }
}

export default TableScreen;
