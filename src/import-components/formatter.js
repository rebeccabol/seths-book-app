import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var d3 = require("d3");
var items = [
  {id: "alast", content: "Author\n(Last)", ex: "Gaiman"}, 
  {id : "afirst", content: "Author (First)", ex: "Neil"},
  {id: "title", content: "Title", ex: "Coraline"}];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, id) => ({
  userSelect: 'none',
  padding: grid * 2,
  display: "flex",
  flexDirection: "column",
  margin: `0 ${id === "title" ? 0 : grid}px 0 0`,
  background: isDragging ? '#DFB7E1' : '#00C3A6',
  ...draggableStyle,
});

const toggleSeparators = s => {
  d3.selectAll("button.format-btn")
    .transition()
    .duration(200 * s)
    .style("opacity", s);
}

export class Formatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      sep: [",", ","],
      toggler: "Toggle List",
      menu: {open : false, element : "title"}
    };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart() {
    toggleSeparators(0);
    if (this.state.menu.open) {
      document.getElementById("punc-container").classList.toggle("enabled");
      this.setState({menu : {open : false, element: 0}})
    }
    
  }

  onDragEnd(result) {
    toggleSeparators(1);
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    
    this.setState({
      items,
      example: items[0].ex + this.state.sep[0] + items[1].ex + this.state.sep[1] + items[2].ex
    });

    
  }

  getItemAddOn = (item, index) => {
    let b1,b2;
    let uid = "s" + index;
    console.log(item.content);
    if (item.content !== "Title") {
      if (index === 0 || index === 1) {
          b2 = 
          <button id={uid} className="format-btn" onClick={this.openTextArea}>
            <span class="tooltip">Enter Separator</span>
            {this.state.sep[index]}
          </button>;
      }
    }
    return (<div className="format-opts">
    {b1}
    {b2}
    {item.content === "Titles" && index === 2 ?
        <button id={uid} className="format-btn" onClick={this.openTextArea}>
        <span class="tooltip">Enter Separator</span>
        {this.state.sep[index]}
        </button>
        : <span/>
        }
    </div>)
  }

  handleToggler = () => {
    let toggler = this.state.toggler === "Toggle List" ? "Toggle Single Title" : "Toggle List";
    let update = items.find(o=> o.id === "title");
    update.content = update.content === "Title" ? "Titles" : "Title";
    update.ex = update.content === "Titles" ? "Coraline;Good Omens" : "Coraline";
    let sep = this.state.sep;
    sep.push(";");
    this.setState({ toggler: toggler, sep: sep})
    if (this.state.menu.open) {
      document.getElementById("punc-container").classList.toggle("enabled");
    }
    console.log(update);
  }

  openTextArea = e => {
    let coords = e.target.getClientRects();
    let x = coords[0].left,
    y = coords[0].top;
    console.log(x, y);
    console.log(d3.select("#punc"));
    d3.select("#punc-container").style("left", x + "px").style("top", y + "px");
    if (!this.state.menu.open) {
      document.getElementById("punc-container").classList.toggle("enabled");
    }
    let menu = this.state.menu;
    menu.open = true;
    menu.element = e.target.id[1];
    d3.select("#punc").property("value", this.state.sep[this.state.menu.element]);
    this.setState({ menu : menu});
  }

  updateSep = e => {
    console.log(e.key);
    if (e.key === "Enter") {
      document.getElementById("punc-container").classList.toggle("enabled");
      let sep = this.state.sep;
      sep[this.state.menu.element] = e.target.value;
      console.log(e.target.value);
      this.setState({ menu : {open : false, }})
    }
    console.log("here");
  }

  render() {
    return (
      <div id="format" className="format">
        <p align="left">Drag and Drop the order of each line in your file</p>
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
              <div ref={provided.innerRef} className="droppable" {...provided.droppableProps}>
              {this.state.items.map((item, index) =>
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                <div className="draggable">
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style,
                    item.id
                  )}>
                  {item.content}
                  {item.id === "title" ? 
                  <label class="switch">
                    <input type="checkbox" onClick={this.handleToggler}/>
                      <span class="slider"/>
                      <span class="tooltip">{this.state.toggler}</span>
                  </label>
                : <b/>}
                </div>
                 {this.getItemAddOn(item, index)}
                 </div>
                )}
              </Draggable>)}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div id="punc-container" className="punc-container">
        <textarea id="punc" className="punc" rows="1" cols="2" type="text" onKeyPress={this.updateSep} maxLength="2"/>
      </div>
      <p>
        ex. <i>{this.state.items[0].ex + this.state.sep[0]
        + this.state.items[1].ex + this.state.sep[1] + this.state.items[2].ex}</i>
      </p>
      </div>
    );
  }
}

export default Formatter;

