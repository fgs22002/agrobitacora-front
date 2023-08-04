import React, { useEffect, useRef } from 'react'
import Records from './components/Records'
import Notification from './components/Notification'
import RecordForm from './components/RecordForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { loggedIn, userChange } from './reducers/userReducer'
import { allRecords } from './reducers/recordReducer'
import { cancelUpdate } from './reducers/updateReducer'
import { useDispatch, useSelector } from 'react-redux'

import './index.css'


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  // Effects
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(loggedIn(user))
    }
  }, [])

  // Handles
  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      window.localStorage.removeItem('loggedUser')
      dispatch(cancelUpdate())
      dispatch(userChange(null))
      dispatch(allRecords([]))
    }
  }

  // Referencias a componentes
  const recordFormRef = useRef()

  return (
    <>
      <h1>Agrobitacora</h1>
      <Notification />

      {user === null ?
        <Togglable buttonLabel='Login'>
          <LoginForm />
        </Togglable> :
        <div>
          <p>{user.name} logged-in <button onClick={() => handleLogout()}>logout</button></p>
          <Togglable buttonLabel='Record form' ref={recordFormRef}>
            <RecordForm />
          </Togglable>
          <Records recordFormRef={recordFormRef} />
        </div>
      }

    </>
  )
}

export default App