import React from 'react'
import RouteJS from './Routes';
import { AuthProvider } from './context/AuthProvider';
import { ModalProvider } from './context/ModalContext';
const App = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <RouteJS />
      </ModalProvider>
    </AuthProvider>
  )
}

export default App