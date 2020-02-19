import React from "react";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const instructions = ["Specify the format of your book list files."];

export class Formatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      options: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart = () => {
    console.log("here");
  };
  onDragUpdate = () => {
    console.log("update");
  };
  onDragEnd = () => {
    console.log("end");
  };

  render() {
    return (
      <div className="panel">
        <div className="instr">
          <div className="step">{this.props.step}</div>
          {instructions}
        </div>
      </div>
    );
  }
}
export default Formatter;
