import React from 'react'
import { useForm } from 'react-hook-form'

const AddTask = ({setAddTaskDisplay}) => { 
    const {register,handleSubmit,reset,formState:{errors}} = useForm(); 
  async  function submitHandler(data){
        console.log(data); 
        setAddTaskDisplay("hidden");
        reset();
    }
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input type="text" placeholder='enter title' className='outline outline-1' {...register("title",{required:"title is required"})} /> 
        {errors.title && <p>{errors.title.message}</p>} 
        <input type="text" placeholder='enter description' className='outline outline-1' {...register("description",{required:"description is required"})} /> 
        {errors.description && <p>{errors.description.message}</p>} 
        <p>Deadline</p> 
        <input type="datetime-local" {...register("deadline",{required:"deadline is required"})} className='outline outline-1' />  
    
        <select {...register("priority")}>
            <option value="2">Select priority</option> 
            <option value="1">low</option>  
            <option value="2">mid</option> 
            <option value="3">high</option>
        </select> 
    
        <button type='submit'>add task</button>
      </form>
    </div>
  )
}

export default AddTask