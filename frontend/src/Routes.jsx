import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import UserLayout from './container/UserLayout';

const RouteJS = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/*' element={<UserLayout/>}/>
    </Routes>
  )
}

export default RouteJS;