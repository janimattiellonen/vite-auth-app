import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton } from './components/auth/LoginButton'
import { LogoutButton } from './components/auth/LogoutButton'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { RegisterForm } from './components/auth/RegisterForm'
import './App.css'

function App() {
  const { isAuthenticated, user, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <h1>Auth App</h1>
        <nav>
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <LoginButton />
              <button 
                onClick={() => window.location.href = '/register'} 
                className="btn-primary"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="user-section">
              <span>Welcome, {user?.name}</span>
              <LogoutButton />
            </div>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={
          <div className="card">
            <h2>Welcome to Auth App</h2>
            {!isAuthenticated && (
              <p>Please log in or register to access protected content</p>
            )}
          </div>
        } />
        
        <Route path="/register" element={<RegisterForm />} />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <div className="card">
              <h2>Profile</h2>
              {user && (
                <div>
                  <p>Email: {user.email}</p>
                  <p>Name: {user.name}</p>
                </div>
              )}
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
