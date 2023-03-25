import React, { createRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { initialData } from "../App/App";
import Card from "../Card/Card";

const Column = ({ column, tasks, state, setState }) => {
  var buttonRef = createRef(null);
  const [inputHide, setInputHide] = React.useState(false);
  //IN ASAKY INPUT
  const [inputText, setInputText] = React.useState("");
  const [editHide, setEditHide] = React.useState(0);
  const [editText, setEditText] = React.useState("");
  const [newItemIndex, setNewItemIndex] = React.useState(4)

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

  const onClickOpenButton = () => {
    setInputHide(!inputHide);
  };

  const onChangeInput = (e) => {
    setInputText(e.target.value);
  };

  const onClickAddButton = () => {
    if (inputText === "") {
      return
    } else {
      setInputHide(!inputHide);
      //ADDING NEW TASK
      const newItem = () => {
      }
      setState(
        ...state,
      )
    }
  };

  const onCLickEdit = (id, index) => {
    setEditHide(prev => !prev)
    setEditHide(index + 1)
    console.log(id.content)
    setEditText(id.content)
  };

  const onCLickEditClose = (id) => {
    setEditHide(0)
    setEditText('')
  };

  const onClickEditSave = (id, index) => {
    setState({
      ...state,
      ...(id.content = editText),
    });
    setEditHide(prev => !prev)
    setEditText('')
  }

  const onClickDelete = (id, index) => {
    // console.log(index)
    
    const newTask = tasks.slice(index + 1)
    const newTaskIds = column.taskIds.slice(index + 1)
    console.log(column.taskIds.splice(index, 1))
    setState(
      {
        ...state,
        // tasks: {
        //   ...state.tasks,
        //   [index + 1]: newTask
        // },
      }
    )
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
                        <textarea onChange={(e) => setEditText(e.target.value)} type="text" value={editText} placeholder="EDIT" className="editTextarea"></textarea>
                        <div className="row2">
                        <button onClick={() => onClickEditSave(task, index)}>EDIT SAVE</button>
                        <button onClick={onCLickEditClose}>X</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => onCLickEdit(task, index)}>EDIT</button>
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
          {inputHide == false ? (
            <button onClick={onClickOpenButton} className="taskAddButton">
              Добавить карточку
            </button>
          ) : (
            ""
          )}
          {inputHide && (
            <div className="inputType">
              <textarea
                ref={buttonRef}
                value={inputText}
                onChange={(e) => onChangeInput(e)}
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
