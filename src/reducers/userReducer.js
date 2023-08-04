import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import recordsService from '../services/recordService'
import { setError } from '../reducers/notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userChange(state, action) {
      return action.payload
    }
  }
})

export const { userChange } = userSlice.actions

export const login = (username,password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      recordsService.setToken(user.token)
      dispatch(userChange(user))
    } catch (exception) {
      dispatch(setError('Wrong credentials!'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    }
  }
}

export const loggedIn = (user) => {
  return async dispatch => {
    dispatch(userChange(user))
    recordsService.setToken(user.token)
  }
}

export default userSlice.reducer