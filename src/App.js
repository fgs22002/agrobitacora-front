import React, { useState, useEffect, useRef } from 'react'
import Records from './components/Records'
import Notification from './components/Notification'
import RecordForm from './components/RecordForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import recordsService from './services/records'
import { userChange } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import './index.css'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [ notification, setNotification] = useState(null)
  const [ error, setError] = useState(null)
  const [ edit, setEdit] = useState(null)

  // Effects
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(userChange(user))
      recordsService.setToken(user.token)
    }
  }, [])

  // Handles
  const handleEditButton = (record) => {
    recordFormRef.current.makeVisible(true)
    setEdit(record)
  }

  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      window.localStorage.removeItem('loggedUser')
      setEdit(null)
      dispatch(userChange(null))
    }
  }

  const cancelEdit = () => {
    recordFormRef.current.makeVisible(false)
    setEdit(null)
  }

  // Referencias a componentes
  const recordFormRef = useRef()
  return (
    <>
      <h1>Agrobitacora</h1>
      <Notification message={notification} className="notification" />
      <Notification message={error} className="error" />

      {user === null ?
        <Togglable buttonLabel='Login'>
          <LoginForm handleSubmit={setError} />
        </Togglable> :
        <div>
          <p>{user.name} logged-in <button onClick={() => handleLogout()}>logout</button></p>
          <Togglable buttonLabel='Record form' ref={recordFormRef}>
            <RecordForm
              isEdit={edit}
              cancelEdit={cancelEdit}
              setNotification={setNotification}
              setError={setError}
            />
          </Togglable>
          <Records
            handleEdit={handleEditButton}
            setNotification={setNotification}
            setError={setError}
          />
        </div>
      }

    </>
  )
}

export default App