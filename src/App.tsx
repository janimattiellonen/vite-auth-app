import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('/api/health')
        const data = await response.json()
        setStatus(data.status)
        setError('')
      } catch (err) {
        setError('Failed to connect to backend: ' + (err as Error).message)
      }
    }

    checkBackend()
  }, [])

  return (
    <div className="app">
      <h1>HTTPS Test</h1>
      <div className="card">
        <h2>Backend Status</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p style={{ color: status === 'ok' ? 'green' : 'orange' }}>
            Status: {status}
          </p>
        )}
      </div>
    </div>
  )
}

export default App
