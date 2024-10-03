import axios from 'axios'
import React, { useState } from 'react'

const Tasks = ({taskProps}) => { 
    const [task,setTask] = useState(taskProps);
  return (
    <div className=' rounded-md flex flex-col  my-2 md:w-[500px] p-3 m-3 shadow-md'> 
      <div className='ml-4'>
          <h1 className='text-3xl font-semibold'>{task.title}</h1> 
          <h2>{task.description}</h2> 
          <p>status: {task.status} </p> 
          <p>priority: {task.priority}</p> 
          <p>deadline: {task.deadline}</p> 

      </div>
      <div className='flex w-full ml-5 '> 
        <button onClick={async()=>{
          const res = await axios.put(`http://localhost:3000/api/v1/task/${task._id}`,{
              status:"completed"
            },{
              headers:{
                  authorization:`Bearer ${localStorage.getItem("token")}`
              } 
            }) 
            setTask(res.data.updatedTask);
        }} className='bg-gray-700 py-2 px-3 w-max rounded-md  text-white'>mark as complete</button>
      </div> 
      
    </div>
  )
}

export default Tasks