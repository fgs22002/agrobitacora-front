import { createSlice } from '@reduxjs/toolkit'
import recordService from '../services/recordService'
import { setNotification } from './notificationReducer'

const recordSlice = createSlice({
  name: 'records',
  initialState: [],
  reducers: {
    createRecord(state, action) {
      state.push(action.payload)
    },
    allRecords(state, action) {
      return action.payload
    },
    updateRecord(state, action) {
      const id = action.payload.id
      const recordToChange = state.find(r => r.id === id)
      const changedNote = {
        ...recordToChange,
        fecha: action.payload.fecha,
        duracion: action.payload.duracion,
        actividad: action.payload.actividad,
        descripcion: action.payload.descripcion,
        responsable: action.payload.responsable,
      }
      return state.map(record =>
        record.id !== id? record:changedNote
      )
    },
    deleteRecord(state, action) {
      const id = action.payload
      return state.filter(r => r.id !== id)
    }
  },
})

export const { createRecord, allRecords, updateRecord, deleteRecord } = recordSlice.actions

export const initializeRecords = (user) => {
  return async dispatch => {
    let records
    if (user) {
      records = await recordService.getAll()
    } else {
      records = []
    }
    dispatch(allRecords(records))
  }
}

export const newRecord = (record) => {
  return async dispatch => {
    const addedRecord = await recordService.create(record)
    dispatch(setNotification(
      `Added ${addedRecord.id}`
    ))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    dispatch(createRecord(addedRecord))
  }
}

export const changeRecord = (id, record) => {
  return async dispatch => {
    const updatedRecord = await recordService.update(id, record)
    dispatch(setNotification(
      `Updated ${updatedRecord.id}`
    ))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    dispatch(updateRecord(updatedRecord))
  }
}

export const removeRecord = (id) => {
  return async dispatch => {
    await recordService.remove(id)
    dispatch(setNotification(
      `Deleted ${id}`
    ))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    dispatch(deleteRecord(id))
  }
}

export default recordSlice.reducer