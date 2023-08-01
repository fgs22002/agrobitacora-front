import React, { useState, useEffect, useRef } from 'react'
import Records from './components/Records'
import Notification from './components/Notification'
import RecordForm from './components/RecordForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import recordsService from './services/records'
import loginService from './services/login'
import { allRecords } from './reducers/recordReducer'
import { useDispatch } from 'react-redux'

import './index.css'

function App() {
  const dispatch = useDispatch()

  const [ notification, setNotification] = useState(null)
  const [ error, setError] = useState(null)
  const [ edit, setEdit] = useState(null)
  const [ user, setUser ] = useState(null)

  // Effects
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      recordsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      recordsService
        .getAll().then(records => {
          //setRecords(records)
          dispatch(allRecords(records))
        }).catch(error => {
          console.log(error)
          setError(
            'Problems trying to retrieve all records'
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    } else {
      //setRecords([])
      dispatch(allRecords([]))
    }
  }, [user])


  // Handles
  const handleEditButton = (record) => {
    recordFormRef.current.makeVisible(true)
    setEdit(record)
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
      setUser(user)
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
      setEdit(null)
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
          <LoginForm handleSubmit={handleLogin} />
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