import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => { 
    const {register,handleSubmit,reset,formState:{errors}} = useForm();   
    const navigate = useNavigate();

   async function submitHandler(data){
        console.log(data);  
        try{
            const res = await axios.post("http://localhost:3000/api/v1/user/login",data,{
               headers:{
                   "Content-Type":"application/json"
               }
            }) 
            console.log(res.data); 
            localStorage.setItem("token",res.data.token);  
            navigate("/")
            alert(res.data.msg);  
        } 
        catch(err){
            console.log(err); 
            alert(err.response.data.msg);
        }
        reset();
    }

  return (
    <div className='flex justify-center'>
         <form onSubmit={handleSubmit(submitHandler)}>
         <div className='my-2'>
                <p>Email: </p>  
                <input type="email" {...register("email",{required:"email is required"})} className='outline outline-1'/> 
                {errors.email && <p>{errors.email.message}</p>}
             </div> 
             <div className='my-2'>
                <p>Password: </p>  
                <input type="password" {...register("password",{required:"password is required",minLength:{value:6,message:"password must be greater than 6"}})} className='outline outline-1'/> 
                {errors.password && <p>{errors.password.message}</p>}
             </div>  
             <button type='submit' className='text-center bg-gray-900 text-white py-2 px-4 rounded-md my-3'>Login</button>
         </form>
    </div>
  )
}

export default Login