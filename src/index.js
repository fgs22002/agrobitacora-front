import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import recordReducer from './reducers/recordReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  records: recordReducer,
  user: userReducer
})
const store = createStore(reducer)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)