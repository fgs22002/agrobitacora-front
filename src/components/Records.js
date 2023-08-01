import React from 'react'
import Record from './Record'
import recordsService from '../services/records'
import { deleteRecord } from '../reducers/recordReducer'
import { useDispatch, useSelector } from 'react-redux'

const Records = ({ handleEdit, setNotification , setError }) => {
  const dispatch = useDispatch()
  const records = useSelector(state => state)

  const delRecord = (id) => {
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
        //setRecords(records.filter(record => record.id !== id))
        dispatch(deleteRecord(id))
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

  return (
    <div>
      <h2>Records</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Activity</th>
            <th>Description</th>
            <th>Responsible</th>
            <th>Edit?</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => <Record key={record.id} record={record} handleDelete={delRecord} handleEdit={handleEdit} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Records