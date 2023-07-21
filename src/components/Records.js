import React from 'react'
import Record from './Record'

const Records = ({ records, handleDelete, handleEdit }) => (
  <div>
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
        {records.map((record) =>
          <Record key={record.id} record={record} handleDelete={handleDelete} handleEdit={handleEdit} /> )}
      </tbody>
    </table>
  </div>
)

export default Records