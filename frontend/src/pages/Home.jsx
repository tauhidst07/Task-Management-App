import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Tasks from '../components/Tasks';
import { useNavigate } from 'react-router-dom';
import AddTask from '../components/AddTask';

const Home = () => { 
    const [userTasks,setUserTasks]= useState([]); 
    const [status,setStatus] = useState(''); 
    const [sortBy,setSortBy]= useState('');   
    const [addTaskDisplay,setAddTaskDisplay] = useState('hidden')
     const navigate = useNavigate()
    async function fetchUserTasks(){
        try{
              const res = await axios.get(`http://localhost:3000/api/v1/task/?status=${status}&sortBy=${sortBy}`,{
                headers:{
                    authorization:`Bearer ${localStorage.getItem("token")}`
                }
              }); 
              setUserTasks(res.data.finalTasks); 
              console.log(res.data);
        } 
        catch(err){
             console.log("error in fetching user tasks",err);
        } 
    }

    useEffect(()=>{
        fetchUserTasks();
    },[status,sortBy])   

    const token = localStorage.getItem("token");

    if(!token){
        navigate("/login")
    }
  return (
    <div>
        <h1>Task to Complete </h1>  

        <button className='bg-black text-white py-2 px-4 rounded-md' onClick={()=>setAddTaskDisplay("fllex")}>Add new task</button> 

         <div className={`${addTaskDisplay} my-5 `}> 
            <div>
                <AddTask setAddTaskDisplay={setAddTaskDisplay}/>
            </div>
         </div> 
        <div className='mt-20'>
        {
            userTasks.length >0 && 
            userTasks.map((task)=><Tasks key={task._id} taskProps={task}/>)
        } 
        </div>

    </div>
  )
}

export default Home