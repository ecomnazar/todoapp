import React from 'react'
import Card from '../Card/Card'
import './style.scss'
import { DragDropContext } from 'react-beautiful-dnd'


import Column from '../Column/Column'
const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds)
    const [removed] = newTaskIds.splice(startIndex, 1)
    newTaskIds.splice(endIndex, 0, removed)

    const newColumn = {
        ...sourceCol,
        taskIds: newTaskIds,
    }

    return newColumn;
}


const App = () => {
    const [state, setState] = React.useState(initialData)
    const onDragEnd = ( result ) => {
        const { destination, source } = result;


        //IF TRY TO DROP IN AN UNKNOWN destination
    if(!destination) return;


    //IF THE DRAGS AND DROPS BACK IN THE SAME PLACE
    if(destination.probbableId === source.droppableId && destination.index === source.index){
        return
    }


    //IF THE USER DROPS WITH IN SAME COLUMN BUT IN A DIFFERENT POSITION
    const sourceCol = state.columns[source.droppableId]
    const destinationCol = state.columns[destination.droppableId]
    if(sourceCol.id === destinationCol.id){
        const newColumn = reorderColumnList(
            sourceCol,
            source.index,
            destination.index
        )

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn
            },
        }
        setState(newState);
        return;
    }

    //IF MOVES FROM ONE COLUMN TO ANOTHER

    const startTaskIds = Array.from(sourceCol.taskIds)
    const [ removed ] = startTaskIds.splice(source.index, 1)
    const newStartCol = {
        ...sourceCol,
        taskIds: startTaskIds,
    }

    const  endTaskIds = Array.from(destinationCol.taskIds)
    endTaskIds.splice(destination.index, 0, removed)
    const newEndCol = {
        ...destinationCol,
        taskIds: endTaskIds
    }
    const newState = {
        ...state,
        columns: {
            ...state.columns,
            [newStartCol.id]: newStartCol,
            [newEndCol.id]: newEndCol
        }
    }
    setState(newState)

    }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='root'>
        <div className="container row">
            {state.columnOrder.map((columnId) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId])
                return <Column key={column.id} column={column} tasks={tasks} />
            })}
        </div>
    </div>
    </DragDropContext>
  )
}

export default App




const initialData = {
    tasks: {
        1: { id: 1, content: "Configure Next.js application" },
        2: { id: 2, content: "Configure Next.js and tailwind" },
        3: { id: 3, content: "Create slidebar navigation menu" },
        4: { id: 4, content: "Create page footer" },
        5: { id: 5, content: "Create page navigationmenu" },
    },
    columns: {
        "column-1": {
            name: 'To do',
            id: "column-1",
            taskIds: [1,2,3,4,5]
        },
        "column-2": {
            name: 'Doing',
            id: "column-2",
            taskIds: []
        },
        "column-3": {
            name: 'Done',
            id: "column-3",
            taskIds: []
        },
    },
    columnOrder: ["column-1", "column-2", "column-3"]
}