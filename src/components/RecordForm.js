import React, { useState } from 'react'
import recordsService from '../services/records'
import { createRecord, updateRecord } from '../reducers/recordReducer'
import { setError, setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { cancelUpdate } from '../reducers/updateReducer'

const RecordForm = () => {
  const dispatch = useDispatch()
  const isEdit = useSelector(state => state.update)
  //Estado
  const [ newDate, setNewDate ] = useState(new Date())
  const [ newDuration, setNewDuration ] = useState(0)
  const [ newActivity, setNewActivity ] = useState('')
  const [ newDescription, setNewDescription ] = useState('')
  const [ newResponsible, setNewResponsible ] = useState('')
  const [ edit, setEdit] = useState(isEdit)


  if (edit !== isEdit) {
    setEdit(isEdit)
    if (isEdit) {
      setNewDate(isEdit.fecha)
      setNewDuration(isEdit.duracion)
      setNewActivity(isEdit.actividad)
      setNewDescription(isEdit.descripcion)
      setNewResponsible(isEdit.responsable)
    }
  }

  //Handles
  const handleDateChange = (event) => {
    setNewDate(event.target.value)
  }
  const handleDurationChange = (event) => {
    setNewDuration(event.target.value)
  }
  const handleActivityChange = (event) => {
    setNewActivity(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }
  const handleResponsibleChange = (event) => {
    setNewResponsible(event.target.value)
  }
  const handleCancelEdit = () => {
    setNewDate(new Date())
    setNewDuration(0)
    setNewActivity('')
    setNewDescription('')
    setNewResponsible('')
    dispatch(cancelUpdate())
  }

  const addRecord = (newRecord) => {
    recordsService
      .create(newRecord)
      .then(addedRecord => {
        dispatch(setNotification(
          `Added ${addedRecord.id}`
        ))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
        dispatch(createRecord(addedRecord))
      }).catch(error => {
        console.log(error)
        dispatch(setError(
          'Problems trying to add new record'
        ))
        setTimeout(() => {
          dispatch(setError(null))
        }, 5000)
      })
  }

  const editRecord = (newRecord) => {
    recordsService
      .update(isEdit.id, newRecord)
      .then(updatedRecord => {
        dispatch(setNotification(
          `Updated ${updatedRecord.id}`
        ))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
        dispatch(updateRecord(updatedRecord))
      }).catch(error => {
        console.log(error)
        dispatch(setError(
          'Problems trying to update record'
        ))
        setTimeout(() => {
          dispatch(setError(null))
        }, 5000)
      }).finally(() => {
        handleCancelEdit()
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newRecord = {
      fecha: newDate,
      duracion: newDuration,
      actividad: newActivity,
      descripcion: newDescription,
      responsable: newResponsible,
    }
    setNewDate(new Date())
    setNewDuration(0)
    setNewActivity('')
    setNewDescription('')
    setNewResponsible('')

    isEdit ? editRecord(newRecord): addRecord(newRecord)
  }

  return (
    <>
      <h2>{isEdit?'Edit record':'Add a new record'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
            Date: <input
            type="date"
            value={newDate}
            onChange={handleDateChange} />
        </div>
        <div>
            Duration: <input
            value={newDuration}
            onChange={handleDurationChange} />
        </div>
        <div>
            Activity: <input
            value={newActivity}
            onChange={handleActivityChange} />
        </div>
        <div>
            Description: <textarea
            value={newDescription}
            onChange={handleDescriptionChange} />
        </div>
        <div>
            Responsible: <input
            value={newResponsible}
            onChange={handleResponsibleChange} />
        </div>
        <div>
          <button type="submit">{isEdit?'save':'add'}</button>
          {isEdit ? <button onClick={() => handleCancelEdit()}>cancel</button> : <></>}
        </div>

      </form>
    </>
  )
}

export default RecordForm