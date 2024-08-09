import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthenticateUser from './middleware/authenticateUser.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticateUser>
      <App />
    </AuthenticateUser>
  </React.StrictMode>,
)
