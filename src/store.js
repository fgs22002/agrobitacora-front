import { configureStore } from '@reduxjs/toolkit'

import recordReducer from './reducers/recordReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import updateReducer from './reducers/updateReducer'

const store = configureStore({
  reducer: {
    records: recordReducer,
    user: userReducer,
    notification: notificationReducer,
    update: updateReducer
  }
})

export default store