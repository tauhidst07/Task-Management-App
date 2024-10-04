import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Update from './pages/Update'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
       <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute> }/> 
       <Route path='/signup' element={<Signup/>} /> 
       <Route path='/login' element= {<Login/>} /> 
       <Route path='/update/:id' element={<ProtectedRoute><Update/></ProtectedRoute> } /> 
       <Route path='*' element={<ProtectedRoute><Home/></ProtectedRoute> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App