import React, {useState, useEffect} from 'react';
import Records from './components/Records';
import Notification from './components/Notification';
import RecordForm from './components/RecordForm';
import recordsService from './services/records'

import './index.css'

function App() {
    const [ records, setRecords ] = useState([]) 
    const [ notification, setNotification] = useState(null)
    const [ error, setError] = useState(null)
    const [ edit, setEdit] = useState(false)
    const [ editId, setEditId ] = useState(null)
    const [ newDate, setNewDate ] = useState(new Date())
    const [ newDuration, setNewDuration ] = useState(0)
    const [ newActivity, setNewActivity ] = useState('...')
    const [ newDescription, setNewDescription ] = useState('...')
    const [ newResponsible, setNewResponsible ] = useState('...')

    // Effects
    const hook = () => {
      recordsService
        .getAll()
        .then(records => {
          setRecords(records)
        }).catch(error => {
          console.log(error)
          setError(
            `Problems trying to retrieve all records`
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  
    useEffect(hook, [])

    // Handles
    const handleDateChange = (event) => {
      console.log(event.target.value)
      setNewDate(event.target.value)
    }
    const handleDurationChange = (event) => {
      console.log(event.target.value)
      setNewDuration(event.target.value)
    }
    const handleActivityChange = (event) => {
      console.log(event.target.value)
      setNewActivity(event.target.value)
    }
    const handleDescriptionChange = (event) => {
      console.log(event.target.value)
      setNewDescription(event.target.value)
    }
    const handleResponsibleChange = (event) => {
      console.log(event.target.value)
      setNewResponsible(event.target.value)
    }

    const handleAddRecord = (event) => {
      event.preventDefault()

      const newRecord = {
          fecha: newDate,
          duracion: newDuration,
          actividad: newActivity,
          descripcion: newDescription,
          responsable: newResponsible,
      }

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
              `Problems trying to add new record`
            )
            setTimeout(() => {
              setError(null)
            }, 5000)
          }).finally(() => {
            setNewDate('')
            setNewDuration(0)
            setNewActivity('')
            setNewDescription('')
            setNewResponsible('')
          })
    }

    const handleEditRecord = (event) => {
      event.preventDefault()

      const newRecord = {
          fecha: newDate,
          duracion: newDuration,
          actividad: newActivity,
          descripcion: newDescription,
          responsable: newResponsible,
      }

      recordsService
        .update(editId, newRecord)
          .then(updatedRecord => {
            setNotification(
              `Updated ${updatedRecord.id}`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setRecords(records.map(record => record.id === editId ? updatedRecord : record))
          }).catch(error => {
            console.log(error)
            setError(
              `Problems trying to add new record`
            )
            setTimeout(() => {
              setError(null)
            }, 5000)
          }).finally(() => {
            setEdit(false)
            setEditId(null)
            setNewDate('')
            setNewDuration(0)
            setNewActivity('')
            setNewDescription('')
            setNewResponsible('')
          })
    }

    const handleDeleteRecord = (id) => {
      console.log("Deleting...", id)
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
      setEdit(true)
      setEditId(record.id)
      setNewDate(record.fecha)
      setNewDuration(record.duracion)
      setNewActivity(record.actividad)
      setNewDescription(record.descripcion)
      setNewResponsible(record.responsable)
    }

    const handleCancelEdit = () => {
      setEdit(false)
      setEditId(null)
      setNewDate('')
      setNewDuration(0)
      setNewActivity('')
      setNewDescription('')
      setNewResponsible('')
    }

    return (
        <>
          <h1>Agrobitacora</h1>
          <Notification message={notification} className="notification" />
          <Notification message={error} className="error" />
                  
          {edit ?
          <RecordForm 
            h2_text={"Edit record "}
            button_text={"edit"}
            newDate={newDate} 
            newDuration={newDuration}  
            newActivity={newActivity} 
            newDescription={newDescription} 
            newResponsible={newResponsible}
            handleDateChange={handleDateChange} 
            handleDurationChange={handleDurationChange} 
            handleActivityChange={handleActivityChange} 
            handleDescriptionChange={handleDescriptionChange} 
            handleResponsibleChange={handleResponsibleChange} 
            handleAddRecord={handleEditRecord}
            handleCancelEdit={handleCancelEdit}
          />    
          :
          <RecordForm 
            h2_text={"Add a new record"}
            button_text={"add"}
            newDate={newDate} 
            newDuration={newDuration}  
            newActivity={newActivity} 
            newDescription={newDescription} 
            newResponsible={newResponsible}
            handleDateChange={handleDateChange} 
            handleDurationChange={handleDurationChange} 
            handleActivityChange={handleActivityChange} 
            handleDescriptionChange={handleDescriptionChange} 
            handleResponsibleChange={handleResponsibleChange} 
            handleAddRecord={handleAddRecord}
          />    
          }
          <h2>Records</h2>
          <Records records={records} handleDelete={handleDeleteRecord} handleEdit={handleEditButton} />
        </>
      )
    }
    
    export default App;