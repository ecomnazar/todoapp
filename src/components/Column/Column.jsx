import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";

const Column = ({ column, tasks }) => {

  return (
    <Droppable droppableId={column.id}>
      {(droppableProvided, droppableSnapshot) => (
        <div className="col" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
          <h2>{column.name}</h2>
          {tasks.map((task, index) => {
            return (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {( draggableProvided, droppableSnapshot ) => (
                        <div className="colInnerActive"
                            ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                            <h2>{task.content}</h2>
                            <div className="leftSideBorder"></div>
                        </div>
                    )}
                </Draggable>
            )
          })}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
