import React, { useEffect, useState } from 'react'
import showToast from 'crunchy-toast';
import Task from '../../component/Task/Task'
import { saveListToLocalStorage }  from './../../util/localStorage';
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


    const clearInputFields = (task) => {
        setTitle(' ');
        setDescription(' ');
        setPriority(' ');
    }

    const findTaskIndexById = (taskId) => {
        let index;

        taskList.forEach((task, i) => {
            if (task.id === taskId) {
                index = i
            }
        })
        return index;
    }

    const checkRequiredFields = () => {
        if(!title){
            showToast('Title is required', 'alert', 3000);
             return false;
        }

        if(!description){
            showToast(' Description is  required', 'alert', 3000);
            return false;
        }
        
        if(!priority){
            showToast(' Priority is required', 'alert', 3000);
            return false;
        }
        return true;
    }

    const addTaskToList = () => {

        if(checkRequiredFields() === false){
            return;
        } 
  
        const randomId = Math.floor(Math.random() * 1000); 

        const obj = {
            id : randomId,
            title : title,
            description: description,
            priority:priority
        }

        const newTaskList = [...taskList, obj]
         setTaskList(newTaskList)

        clearInputFields()
        saveListToLocalStorage(newTaskList);
        showToast('Task added sucessfully', 'success', 3000);
    }

    const removeTaskFromList = (id) =>{
    const index = findTaskIndexById (id);

        const tempArray = taskList;
        tempArray.splice(index, 1)

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
        showToast('Task deleted successfully ', 'alert', 3000);
    }

    const setTaskEditable = (id) =>{
        setIsEdit(true);
        setId(id);
       
        const index = findTaskIndexById(id);

        const currentEditTask = taskList[index];

      setTitle(currentEditTask.title);
      setDescription(currentEditTask.description);
      setPriority(currentEditTask.priority);
    }



    const updateTask = () => {
        if(checkRequiredFields() === false){
            return;
        } 
    
       const indexToUpdate = findTaskIndexById(id);
       
       const tempArray = taskList;
          tempArray[indexToUpdate] = {
          id: id,
          title: title,
          description: description,
          priority: priority
       }

       setTaskList([...tempArray]);

       saveListToLocalStorage(tempArray);
       showToast('Task updated successfully', 'info', 3000);

       setId(0);
       clearInputFields();
       setIsEdit(false);

       console.log(tempArray);
    }

    return(
        <div className='container'>
           <h1 className='app-title'>📒 Quest-Check  Planner 📒</h1>

           <div className='todo-flex-container'>
            <div>
             <h2 className='text-center'>  show list </h2>
             <div className='tasks-container'>
             {
                taskList.map((taskItem, index) => {
                    const { id, title, description, priority} = taskItem;

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
            </div>

            <div>
              <h2 className='text-center'>
                {isEdit ? `update Task ${id}`: 'Add Task ➕'}
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
                        <button className='btn-add-task' 
                             type='button'
                            onClick={() =>{
                                isEdit ? updateTask() : addTaskToList()
                            }}>
                             {isEdit ? 'update✔️': 'Add✔️'}
                          </button>
                    
                    </div>
                </form>
              </div>
            </div>
           </div>
        </div>
    )
}
export default Home 