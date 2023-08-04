import React from 'react'
import { removeRecord } from '../reducers/recordReducer'
import { useDispatch } from 'react-redux'
import { toUpdateRecord } from '../reducers/updateReducer'

const Record = ({ record, recordFormRef }) => {
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(removeRecord(id))
  }

  const deleteClick = (record) => {
    if (window.confirm(`Delete ${record.id}?`)) {
      handleDelete(record.id)
    }
  }
  const editClick = (record) => {
    if (window.confirm(`Edit ${record.id}?`)) {
      recordFormRef.current.makeVisible(true)
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