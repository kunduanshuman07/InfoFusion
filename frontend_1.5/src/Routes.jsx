import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SigupPage';
import Layout from "./container/Layout";
import PersonalInfo from './components/PersonalInfo';
import QuizDashboard from './components/QuizDashboard';
import { useAuth } from './context/AuthProvider';
import QuizForm from './pages/QuizFormPage';
import UploadPostAdmin from './pages/UploadPostAdmin';
import LandingPage from './pages/LandingPage';
const RoutesJS = () => {
  const { auth } = useAuth();
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element= {auth ? <Layout /> : <Navigate to="/login" replace />}/>
        <Route path='/profile/personal-info' element={auth && <PersonalInfo />} />
      <Route path='/playground/quiz-dashboard' element={auth && <QuizDashboard />} />
      <Route
        path='/playground/quiz-dashboard/:userId'
        element={auth && <QuizDashboard />}
      />
      <Route path='/quiz-form-admin' element={auth && <QuizForm />} />
      <Route path='/create-post-admin' element={<UploadPostAdmin />} />
    </Routes>
  )
}

export default RoutesJS