import React, { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
  //Estado
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  //Handles
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm