import React from 'react'
import recordsService from '../services/records'
import { deleteRecord } from '../reducers/recordReducer'
import { setError, setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { toUpdateRecord } from '../reducers/updateReducer'

const Record = ({ record }) => {
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    recordsService
      .remove(id)
      .then(response => {
        console.log(response)
        dispatch(setNotification(
          `Deleted ${id}`
        ))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 5000)
        dispatch(deleteRecord(id))
      }).catch(error => {
        console.log(error)
        dispatch(setError(
          `Problems trying to delete record ${id}`
        ))
        setTimeout(() => {
          dispatch(setError(null))
        }, 5000)
      })
  }

  const deleteClick = (record) => {
    if (window.confirm(`Delete ${record.id}?`)) {
      handleDelete(record.id)
    }
  }
  const editClick = (record) => {
    if (window.confirm(`Edit ${record.id}?`)) {
      dispatch(toUpdateRecord(record))
    }
  }
  return (
    <tr>
      <td>{record.id}</td>
      <td>{record.fecha}</td>
      <td>{record.duracion}</td>
      <td>{record.actividad}</td>
      <td>{record.descripcion}</td>
      <td>{record.responsable}</td>
      <td><button onClick={() => editClick(record)}>edit</button></td>
      <td><button onClick={() => deleteClick(record)}>delete</button></td>
    </tr>
  )
}

export default Record