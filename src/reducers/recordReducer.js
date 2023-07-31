const recordReducer = (state = [], action) => {
  switch(action.type) {
  case 'ALL':
    return action.data
  case 'NEW_RECORD':
    return [...state, action.data]
  case 'DELETE_RECORD': {
    const id = action.data.id
    return state.filter(r => r.id !== id)
  }
  case 'UPDATE_RECORD': {
    const id = action.data.id
    const recordToChange = state.find(r => r.id === id)
    const changedNote = {
      ...recordToChange,
      fecha: action.data.fecha,
      duracion: action.data.duracion,
      actividad: action.data.actividad,
      descripcion: action.data.descripcion,
      responsable: action.data.responsable,
    }
    return state.map(record =>
      record.id !== id? record:changedNote
    )
  }
  default:
    return state
  }
}

export const createRecord = (content) => {
  return {
    type: 'NEW_RECORD',
    data: content
  }
}

export const allRecords = (content) => {
  return {
    type: 'ALL',
    data: content
  }
}

export const updateRecord = (content) => {
  return {
    type: 'UPDATE_RECORD',
    data: content
  }
}

export const deleteRecord = (id) => {
  return {
    type: 'DELETE_RECORD',
    data: { id }
  }
}
export default recordReducer