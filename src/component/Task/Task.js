import React from 'react'
import "./Task.css"

 const Task = ({id, title, description, priority, removeTaskFromList,obj, setTaskEditable }) => {
    return(
        
         <div className='task-container' >
             <h1 className='task-title'>{title}</h1>
             <p className='task-desciption'>{description}</p>
            <span className='task-priority'>🎯  {priority}</span>
            <span className='task-delete-icon'
            onClick={()=> {
                removeTaskFromList(id);
            }}
            >
            🗑️
            </span>

            <span className='task-edit-icon'
            onClick={()=> {
                setTaskEditable(id);
            }}
            >
            ✏️
            </span>
         </div>
        
    )
}

export default Task