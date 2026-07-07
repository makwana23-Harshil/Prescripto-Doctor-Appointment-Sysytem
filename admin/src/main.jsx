import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/Admin_Context.jsx'
import DoctorContextProvider from './context/Doctor_Context.jsx'
import AppContextProvider from './context/App_Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
    <AdminContextProvider>
     
      <DoctorContextProvider>
      
        <AppContextProvider>
          <App />
        </AppContextProvider>

      </DoctorContextProvider>

    </AdminContextProvider>

  </BrowserRouter>,
)
