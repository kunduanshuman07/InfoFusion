import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SigupPage';
import Layout from "./container/Layout";
import { useAuth } from './context/AuthProvider';
const RoutesJS = () => {
  const { auth } = useAuth();
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/*' element= {auth ? <Layout /> : <Navigate to="/login" replace />}/>
    </Routes>
  )
}

export default RoutesJS