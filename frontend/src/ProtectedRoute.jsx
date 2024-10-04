
import React, { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {  
    const {isAuthenticated} = useContext(AuthContext); 
    useEffect(()=>{
        console.log("protected called",isAuthenticated); 
       
    },[]) 
    if(!isAuthenticated){ 
       return <Navigate to="/login" />
    } 
    return children;
}

export default ProtectedRoute