import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import UserLayout from './container/UserLayout';
import SignUpPage from './pages/SignUpPage';

const RouteJS = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='signup' element={<SignUpPage/>}/>
        <Route path='/*' element={<UserLayout/>}/>
    </Routes>
  )
}

export default RouteJS;