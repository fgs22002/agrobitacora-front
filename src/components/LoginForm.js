import React, { useState } from 'react'
import loginService from '../services/login'
import recordsService from '../services/records'
import { userChange } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({ setError }) => {
  const dispatch = useDispatch()
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

  const handleLogin = async ({ username,password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      recordsService.setToken(user.token)
      dispatch(userChange(user))
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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