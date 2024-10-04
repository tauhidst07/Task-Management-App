import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Tasks from '../components/Tasks';
import { useNavigate } from 'react-router-dom';
import AddTask from '../components/AddTask';
import Filter from '../components/filter';
import { AuthContext } from '../context/AuthContext';

const Home = () => { 
    const [userTasks,setUserTasks]= useState([]); 
    const [status,setStatus] = useState(''); 
    const [sortBy,setSortBy]= useState('');   
    const [addTaskDisplay,setAddTaskDisplay] = useState('hidden') 
    const {logout} = useContext(AuthContext);
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
        console.log(`status:${status} sortBy: ${sortBy}`)
        fetchUserTasks();
    },[status,sortBy])   

    const token = localStorage.getItem("token");

    if(!token){
        navigate("/login")
    }
  return (
    <div className='flex flex-col items-center mt-3 my-4'> 
        <h1 className='text-3xl font-bold mt-4'>Tasks to Complete </h1>   
        <button  
        onClick={()=>{
           logout(); 
           navigate("/login")
        }}
        >Logout</button>

        <button className='bg-gray-700 py-2 px-3 w-max rounded-md  text-white my-3' onClick={()=>setAddTaskDisplay("fllex")}>Add new task</button> 

         <div className={`${addTaskDisplay} my-5 `}> 
            <div>
                <AddTask setAddTaskDisplay={setAddTaskDisplay} fetchUserTasks={fetchUserTasks}/>
            </div>
         </div>  
        <div className='mt-16'>
            <Filter setStatus={setStatus} setSortBy={setSortBy}/>
        </div>
        <div className='mt-4'>
        {
            userTasks.length >0 && 
            userTasks.map((task)=><Tasks key={task._id} taskProps={task} fetchUserTasks={fetchUserTasks} />)
        } 
        </div>

    </div>
  )
}

export default Home