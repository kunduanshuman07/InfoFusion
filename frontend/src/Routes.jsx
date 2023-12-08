import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserLayout from './container/UserLayout';
import SignUpPage from './pages/SignUpPage';
import PersonalInfo from './components/PersonalInfo';
import QuizDashboard from './components/QuizDashboard';

const RouteJS = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='signup' element={<SignUpPage/>}/>
        <Route path='/*' element={<UserLayout/>}/>
        <Route path='/personal-info' element={<PersonalInfo/>}/>
        <Route path='quiz-dashboard' element={<QuizDashboard/>}/>
    </Routes>
  )
}

export default RouteJS;