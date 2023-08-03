import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)