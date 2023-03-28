import React, { createRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { initialData } from "../App/App";
import Card from "../Card/Card";

const Column = ({ column, tasks, state, setState, newItemIndex, setNewItemIndex }) => {
  var buttonRef = createRef(null);
  const [inputHide, setInputHide] = React.useState(false);
  //IN ASAKY INPUT
  const [inputText, setInputText] = React.useState("");
  const [editHide, setEditHide] = React.useState(0);
  const [editText, setEditText] = React.useState("");

  //ON CLICK OPEN BUTTON OPENS INPUT WITH FOCUS
  React.useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [buttonRef]);
  //ON CLICK OPEN BUTTON OPENS INPUT WITH FOCUS

  const onClickCloseButton = () => {
    setInputHide(!inputHide);
    setInputText("");
  };
  const onClickAddButton = ({ index }) => {
    if (inputText === "") {
      console.log(index)
      return;
    } else {
      setInputHide(!inputHide);
      //ADDING NEW TASK
      // tasks.push({id: newItemIndex, content: inputText})
      setNewItemIndex(newItemIndex + 1)
      // column.taskIds.push(newItemIndex - 1)
      setInputText("");
      const newState = {
        ...state,
        tasks: {
          ...state.tasks,
          [newItemIndex]: {id: newItemIndex + 1, content: inputText}
        },
      }
      column.taskIds.push(newItemIndex)
      console.log(column.taskIds);
      console.log(state.tasks);
      setState(newState)
      console.log(newItemIndex) 
    }
  };

  const onCLickEdit = (id, index) => {
    setEditHide((prev) => !prev);
    setEditHide(index + 1);
      console.log(column)
      console.log(column.taskIds.length)
      setEditText(id.content);
  };

  const onCLickEditClose = () => {
    setEditHide(0);
    setEditText("");
  };

  const onClickEditSave = (id) => {
    id.content = editText;
    setEditHide((prev) => !prev);
    setEditText("");
  };

  const onClickDelete = (id, index) => {
    console.log(column.taskIds.splice(index, 1));
    setState({ ...state });
  };

  return (
    <Droppable droppableId={column.id}>
      {(droppableProvided, droppableSnapshot) => (
        <div
          className="col"
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          <h2>{column.name}</h2>
          {tasks.map((task, index) => {
            return (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, droppableSnapshot) => (
                  <div
                    className="colInnerActive"
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <h2>{task.content}</h2>
                    <div className="leftSideBorder"></div>
                    {editHide == index + 1 ? (
                      <div>
                        <textarea
                          onChange={(e) => setEditText(e.target.value)}
                          type="text"
                          value={editText}
                          placeholder="EDIT"
                          className="editTextarea"
                        ></textarea>
                        <div className="row2">
                          <button onClick={() => onClickEditSave(task, index)}>
                            EDIT SAVE
                          </button>
                          <button onClick={onCLickEditClose}>X</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => onCLickEdit(task, index)}>
                          EDIT
                        </button>
                        <button onClick={() => onClickDelete(task, index)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            );
          })}
          
          
          {/* IN ASAKY ADD BUTTON */}

          
          {inputHide == false ? (
            <button onClick={() => setInputHide(!inputHide)}className="taskAddButton">Добавить карточку</button>
          ) : (
            ""
          )}
          {inputHide && (
            <div className="inputType">
              <textarea
                ref={buttonRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ввести заголовок для этой карточки"
              ></textarea>
              <div className="row2">
                <button
                  onClick={onClickAddButton}
                  className="taskAddInputButton"
                >
                  Добавить карточку
                </button>
                <button
                  onClick={onClickCloseButton}
                  className="closeInputButton"
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
