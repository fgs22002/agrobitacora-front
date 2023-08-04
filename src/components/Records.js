import React, { useEffect } from 'react'
import Record from './Record'
import { initializeRecords } from '../reducers/recordReducer'
import { useDispatch, useSelector } from 'react-redux'

const Records = ( { recordFormRef } ) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const records = useSelector(state => state.records)

  useEffect(() => {
    dispatch(initializeRecords(user))
  }, [user])

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
          {records.map((record) => <Record key={record.id} record={record} recordFormRef={recordFormRef} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Records