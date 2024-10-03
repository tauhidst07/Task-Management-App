import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'

const AddTask = ({setAddTaskDisplay,fetchUserTasks}) => { 
    const {register,handleSubmit,reset,formState:{errors}} = useForm(); 
  async  function submitHandler(data){
        console.log(data); 
        setAddTaskDisplay("hidden"); 
        try{
           const res = await axios.post("http://localhost:3000/api/v1/task/",data,{
             headers:{
              authorization:"Bearer "+localStorage.getItem("token"), 
              "Content-Type":"application/json"
             }
           }) 
           fetchUserTasks();
        } 
        catch(err){
          console.log("error in tast creation",err.response.data);
        }
      
    }
  return (
    <div className='md:w-[500px] shadow-md relative' >
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col'>  
         <div className='font-bold text-xl absolute right-0 cursor-pointer' onClick={()=>setAddTaskDisplay("hidden")}>X</div>
          <div className='ml-4 my-2' > 
            <p className='text-xl font-semibold my-1'>Add Title</p>
            <input type="text"  className='outline outline-1 w-[90%] py-1 px-4 rounded-sm' {...register("title",{required:"title is required"})} /> 
            {errors.title && <p>{errors.title.message}</p>} 
          </div> 
          <div className='ml-4 my-2'> 
            <p className='text-xl font-semibold my-1'>Add Desciption</p>
            <input type="text" placeholder='enter description' className='outline outline-1 w-[90%] py-1 px-4 rounded-sm'{...register("description",{required:"description is required"})} /> 
            {errors.description && <p>{errors.description.message}</p>} 
          </div> 
          <div className='ml-4 my-2'>
            <p className='text-xl font-semibold my-1'>Deadline</p> 
            <input type="datetime-local" {...register("deadline",{required:"deadline is required"})} className='outline outline-1 w-[90%] py-1 px-4 rounded-sm' />  
          </div>
          <div className='ml-4 my-2'>
            <select {...register("priority")}>
                <option value="2">Select priority</option> 
                <option value="1">low</option>  
                <option value="2">mid</option> 
                <option value="3">high</option>
            </select> 
          </div>
    
          <button type='submit' className='bg-gray-700 py-2 px-3 w-max rounded-md  text-white self-center mb-3'>Add task</button>
      </form>
    </div>
  )
}

export default AddTask