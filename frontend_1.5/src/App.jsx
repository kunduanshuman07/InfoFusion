import React from 'react'
import RouteJS from './Routes';
import "./App.css"
import { AuthProvider } from './context/AuthProvider';
const App = () => {
  return (
    <AuthProvider>
      <RouteJS />
    </AuthProvider>
  )
}

export default App