import React from 'react'
import RouteJS from './Routes';
import { AuthProvider } from './context/AuthProvider';
import "./index.css"
const App = () => {
  return (
    <AuthProvider>
      <RouteJS />
    </AuthProvider>
  )
}

export default App