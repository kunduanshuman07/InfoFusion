import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SigupPage';
import Layout from "./container/Layout";
const RoutesJS = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/*' element={<Layout/>}/>
    </Routes>
  )
}

export default RoutesJS