import React, { useState, useEffect } from 'react'
import Records from './components/Records'
import Notification from './components/Notification'
import RecordForm from './components/RecordForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import recordsService from './services/records'
import loginService from './services/login'

import './index.css'

function App() {
  const [ records, setRecords ] = useState([])
  const [ notification, setNotification] = useState(null)
  const [ error, setError] = useState(null)
  const [ edit, setEdit] = useState(null)
  const [ user, setUser ] = useState(null)

  // Effects
  useEffect(() => {
    recordsService
      .getAll().then(records => {
        setRecords(records)
      }).catch(error => {
        console.log(error)
        setError(
          'Problems trying to retrieve all records'
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      recordsService.setToken(user.token)
    }
  }, [])

  // Handles
  const handleDeleteRecord = (id) => {
    console.log('Deleting...', id)
    recordsService
      .remove(id)
      .then(response => {
        console.log(response)
        setNotification(
          `Deleted ${id}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setRecords(records.filter(record => record.id !== id))
      }).catch(error => {
        console.log(error)
        setError(
          `Problems trying to delete record ${id}`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  const handleEditButton = (record) => {
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

  const addRecord = (newRecord) => {
    recordsService
      .create(newRecord)
      .then(addedRecord => {
        setNotification(
          `Added ${addedRecord.id}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setRecords(records.concat(addedRecord))
      }).catch(error => {
        console.log(error)
        setError(
          'Problems trying to add new record'
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  const editRecord = (newRecord) => {
    recordsService
      .update(edit.id, newRecord)
      .then(updatedRecord => {
        setNotification(
          `Updated ${updatedRecord.id}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setRecords(records.map(record => record.id === edit.id ? updatedRecord : record))
      }).catch(error => {
        console.log(error)
        setError(
          'Problems trying to add new record'
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      }).finally(() => {
        setEdit(null)
      })
  }

  const cancelEdit = () => {
    setEdit(null)
  }

  return (
    <>
      <h1>Agrobitacora</h1>
      <Notification message={notification} className="notification" />
      <Notification message={error} className="error" />

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm handleSubmit={handleLogin} />
        </Togglable> :
        <div>
          <p>{user.name} logged-in <button onClick={() => handleLogout()}>logout</button></p>
          <RecordForm
            isEdit={edit}
            addRecord={edit?editRecord:addRecord}
            cancelEdit={cancelEdit}
          />
        </div>
      }

      <h2>Records</h2>
      <Records records={records} handleDelete={handleDeleteRecord} handleEdit={handleEditButton} />
    </>
  )
}

export default App