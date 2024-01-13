import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SigupPage';
import Layout from "./container/Layout";
import { useAuth } from './context/AuthProvider';
import QuizForm from './pages/QuizFormPage';
import UploadPostAdmin from './pages/UploadPostAdmin';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import ConnectPage from './pages/ConnectPage';
const RoutesJS = () => {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/*' element={auth ? <Layout /> : <Navigate to="/login" replace />} />
      <Route path='/profile/:userId' element={auth && <ProfilePage />} />
      <Route path='/profile/edit-profile' element={auth && <EditProfilePage />} />
      <Route path='/quiz-form-admin' element={auth && <QuizForm />} />
      <Route path='/create-post-admin' element={<UploadPostAdmin />} />
      <Route path='/connect' element={<ConnectPage/>}/>
    </Routes>
  )
}

export default RoutesJS