import axios from 'axios'
import React, { useState } from 'react'

const Tasks = ({taskProps}) => { 
    const [task,setTask] = useState(taskProps); 
  
  return (
    <div className=' rounded-md flex flex-col  my-2 md:w-[500px] p-3 m-3 shadow-md gap-y-2'> 
      <div className='ml-4 py-2 flex flex-col gap-y-3'>
          <h1 className='text-3xl font-semibold'>{task.title.toUpperCase()}</h1> 
          <h2 className='text-xl text-gray-600'>{task.description}</h2> 
          <p > <span className='font-semibold'>STATUS: </span><span className='bg-yellow-300 rounded-md py-1 px-2 text-sm'>{task.status}</span> </p> 
          <p ><span className='font-semibold'>PRIORITY: </span><span className={`${task.priority == 1 ?"bg-red-400":task.priority == 2 ?"bg-red-500":"bg-red-700" } py-1 px-2 rounded-md text-white`}>{ 
              task.priority ==1 ? "Low" :task.priority ==2 ? "Medium":"High"
            }</span></p> 
          <p><span className='font-semibold'>DEADLINE: </span> {task.deadline}</p> 

      </div>
      <div className='flex w-full ml-5 gap-x-4 '> 
        <button onClick={async()=>{
          const res = await axios.put(`http://localhost:3000/api/v1/task/${task._id}`,{
              status:"completed"
            },{
              headers:{
                  authorization:`Bearer ${localStorage.getItem("token")}`
              } 
            })  
            console.log(res.data.finalTask)
            setTask(res.data.finalTask); 
    
        }} className='bg-gray-700 py-2 px-3 w-max rounded-md  text-white'>mark as complete</button> 
        <button className='bg-gray-700 py-2 px-3 w-max rounded-md  text-white'>
          Remove
        </button>
      </div> 
      
    </div>
  )
}

export default Tasks