import React, { useState } from 'react'
import supabase from '../supabaseClient'
import './Login.css'


const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('username', username)
    .single()

  if (error) {
    alert(error.message)
    setError('User not found.')
    setLoading(false)
    return
  }

  if (data.password !== password) {
    setError('Incorrect password.')
    setLoading(false)
    return
  }
  alert('Login successful!')
  setLoading(false)
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default Login