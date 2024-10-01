import axios from 'axios'
import React, { useState } from 'react'

const Tasks = ({taskProps}) => { 
    const [task,setTask] = useState(taskProps);
  return (
    <div>
      <h1>{task.title}</h1> 
      <h2>{task.description}</h2> 
      <p>status: {task.status} </p> 
      <p>priority: {task.priority}</p> 
      <p>deadline: {task.deadline}</p> 
      <button onClick={async()=>{
         const res = await axios.put(`http://localhost:3000/api/v1/task/${task._id}`,{
            status:"completed"
          },{
            headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`
            } 
          }) 
          setTask(res.data.updatedTask);
      }}>mark as complete</button>
    </div>
  )
}

export default Tasks