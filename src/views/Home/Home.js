import React, { useState } from 'react'
import Task from '../../component/Task/Task'
import "./Home.css"


  export const Home = () => {
    const [taskList , setTaskList] = useState([
        {
            id:1,
            title: 'submit assignment',
            description: 'nahi to gali padegi',
            priority: 'high'
        },
        {
            id:2,
            title: 'submit assignment',
            description: 'nahi to gali padegi',
            priority: 'high'
        },
        {
            id:3,
            title: 'submit assignment',
            description: 'nahi to gali padegi',
            priority: 'high'
        },
        {
            id:4,
            title: 'submit assignment',
            description: 'nahi to gali padegi',
            priority: 'high'
        }
    ] )

    const [title,setTitle] = useState('');
    const [description ,setDescription] = useState('');
    const [priority , setPriority ] = useState('');

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random()*1000); 
        const obj = {
            id : randomId,
            title : title,
            description: description,
            priority:priority
        }
        setTaskList([... taskList , obj])
    }


    return(
        <div className='container'>
           <h1 className='app-title'>To Do List</h1>

           <div className='todo-flex-container'>
            <div>
             <h2 className='text-center'>  show list </h2>
             {
                taskList.map((taskItem, index)=>{
                    const { id, title,description,priority} = taskItem;
                    return <Task id={id} title={title} description=
                    {description} priority={priority}/>

                })
             }
            

            </div>

            <div>
              <h2 className='text-center'>  Add list</h2>
              <div className='add-task-form-container'>
                
                <form>
                   
                    <input type='text' value={title} onChange={(e)=>{
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

                    <button className='btn-add-task' 
                    type='button'
                    onClick={addTaskToList}>
                      Add Task to List
                    </button>
                </form>

              </div>
            </div>
           </div>
        </div>
    )
}
export default Home 