import { createSlice } from '@reduxjs/toolkit'

const updateSlice = createSlice({
  name: 'update',
  initialState: null,
  reducers: {
    toUpdateRecord(state, action) {
      return action.payload
    },
    cancelUpdate() {
      return null
    }
  }
})

export const { toUpdateRecord, cancelUpdate } = updateSlice.actions
export default updateSlice.reducer