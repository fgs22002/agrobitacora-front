import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    className: ''
  },
  reducers: {
    setError(state, action) {
      const error = {
        message: action.payload,
        className: 'error'
      }
      return error
    },
    setNotification(state, action) {
      const notification = {
        message: action.payload,
        className: 'notification'
      }
      return notification
    }
  }
})

export const { setError, setNotification } = notificationSlice.actions
export default notificationSlice.reducer