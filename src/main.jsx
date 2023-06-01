import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import mylogo from '/mylogo1.png'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <img
          className="logomy animate__animated animate__fadeIn"
          src= {mylogo} 
          alt="logo"
        />
    <h3 className='animate__animated animate__fadeIn'> My Technology is created by Andres Velasquez Franco</h3>
  </React.StrictMode>,
)
