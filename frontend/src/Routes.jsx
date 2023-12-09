import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserLayout from './container/UserLayout';
import SignUpPage from './pages/SignUpPage';
import PersonalInfo from './components/PersonalInfo';
import QuizDashboard from './components/QuizDashboard';
import { useAuth } from './context/AuthProvider';
const RouteJS = () => {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='signup' element={<SignUpPage />} />
      <Route path='/*' element={auth ? <UserLayout /> : <Navigate to='/login' />} />
      <Route path='/personal-info' element={auth && <PersonalInfo />} />
      <Route path='quiz-dashboard' element={auth && <QuizDashboard />} />
    </Routes>
  )
}

export default RouteJS;