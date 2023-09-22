import React, { useEffect, useState } from 'react'
import Task from '../../component/Task/Task'
import "./Home.css"


  export const Home = () => {
    const [taskList , setTaskList] = useState([
        {
            id:1,
            title: 'submit assignment',
            description: 'nahi to gali padegi',
            priority: 'High'
        },
       
    ] )

    const [id, setId] = useState(0);
    const [title,setTitle] = useState('');
    const [description ,setDescription] = useState('');
    const [priority , setPriority ] = useState('');
    const [isEdit , setIsEdit] =useState(false);


   useEffect(() =>{
    const list = JSON.parse(localStorage.getItem('Quest'));
    if(list && list.length>0){
        setTaskList(list)
    } 
   }, {})

    const saveListToLocalStorage = (tasks) =>{
        localStorage.setItem('Quest',JSON.stringify(tasks))

    }

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random() * 1000); 

        const obj = {
            id : randomId,
            title : title,
            description: description,
            priority:priority
        }

        const newTaskList = [...taskList, obj]

        setTaskList(newTaskList)

        setTitle(' ');
        setDescription(' ');
        setPriority(' ');

        saveListToLocalStorage(newTaskList);
    }

    const removeTaskFromList = (id) =>{
        let index;
        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = 1

            }
        })

        const tempArray = taskList;
        tempArray.splice(index, 1)

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
    }

    const setTaskEditable = (id) =>{
        setIsEdit(true);
        setId(id);
        let currentEditTask;

        taskList.forEach((task) => {
            if (task.id === id) {
                currentEditTask = task;
            }
        })
      setTitle(currentEditTask.title);
      setDescription(currentEditTask.description);
      setPriority(currentEditTask.priority);
    }

    const updateTask = () => {
       let indexToUpdate;

       taskList.forEach((task, i) => {
        if(task.id === id){
            indexToUpdate = i;
        }
       })

       const tempArray = taskList;
       tempArray[indexToUpdate] = {
        id: id,
        title: title,
        description: description,
        priority: priority
       }

       setTaskList([...tempArray])

       saveListToLocalStorage(tempArray)

       setTitle(0);
       setDescription(' ');
       setPriority(' ');
       setIsEdit(false);
    }

    return(
        <div className='container'>
           <h1 className='app-title'>Quest-Check  Planner 📒</h1>

           <div className='todo-flex-container'>
            <div>
             <h2 className='text-center'>  show list </h2>
             {
                taskList.map((taskItem, index)=>{
                    const { id, title,description,priority} = taskItem;

                    return <Task id={id}
                      title={title}
                       description={description}
                       priority={priority}
                       key={index}
                       removeTaskFromList={removeTaskFromList}
                       setTaskEditable={setTaskEditable}
                  />
                })
             }
            </div>

            <div>
              <h2 className='text-center'>
                {isEdit ? `update Task ${id}`: 'Add Task'}
               </h2>
              <div className='add-task-form-container'>
                
                <form>
                   
                    <input type='text'
                     value={title} 
                     onChange={(e)=>{
                      setTitle(e.target.value)
                    }} 
                    placeholder='Enter title'
                    className='task-input'
                    />


                    <input type='text' value={description} onChange={(e) =>{
                        setDescription(e.target.value)
                    }}
                    placeholder='Enter description'
                    className='task-input'
                     />

                    
                    <input type='text' value={priority} onChange={(e) =>{
                        setPriority(e.target.value)
                    }}
                    placeholder='Enter priority'
                    className='task-input'
                    />
                    <div className='btn-container'>
                      {
                        isEdit ?
                        <button className='btn-add-task' 
                         type='button'
                          onClick={updateTask}>
                          Update 
                           </button>
                         :
                           <button className='btn-add-task' 
                             type='button'
                            onClick={addTaskToList}>
                             Add 
                          </button>
                      }
                    </div>
                </form>
              </div>
            </div>
           </div>
        </div>
    )
}
export default Home 