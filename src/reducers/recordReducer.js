import { createSlice } from '@reduxjs/toolkit'
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
export default recordSlice.reducer