import recordReducer from './recordReducer'
import deepFreeze from 'deep-freeze'

describe('recordReducer', () => {
  // Prueba para la creación de registros
  test('returns new state with action ALL', () => {
    const state = [
      {
        fecha: new Date(),
        duracion: 1,
        actividad: 'newActivity',
        descripcion: 'newDescription',
        responsable: 'newResponsible',
        id: 1
      },
      {
        fecha: new Date(),
        duracion: 2,
        actividad: 'newActivity2',
        descripcion: 'newDescription2',
        responsable: 'newResponsible2',
        id: 2
      }
    ]
    const action = {
      type: 'records/allRecords',
      data: [{
        fecha: new Date(),
        duracion: 3,
        actividad: 'newActivity3',
        descripcion: 'newDescription3',
        responsable: 'newResponsible3',
        id: 3
      },
      {
        fecha: new Date(),
        duracion: 4,
        actividad: 'newActivity4',
        descripcion: 'newDescription4',
        responsable: 'newResponsible4',
        id: 4
      },
      {
        fecha: new Date(),
        duracion: 5,
        actividad: 'newActivity5',
        descripcion: 'newDescription5',
        responsable: 'newResponsible5',
        id: 5
      }
      ]
    }

    deepFreeze(state)
    const newState = recordReducer(state, action)

    expect(newState).toHaveLength(3)
  })
  // Prueba para la creación de registros
  test('returns new state with action NEW_RECORD', () => {
    const state = []
    const action = {
      type: 'records/createRecord',
      data: {
        fecha: new Date(),
        duracion: 56,
        actividad: 'newActivity',
        descripcion: 'newDescription',
        responsable: 'newResponsible',
        id: 1
      }
    }

    deepFreeze(state)
    const newState = recordReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })
  // Prueba para la modificación de registros
  test('returns new state with action UPDATE_RECORD', () => {
    const state = [
      {
        fecha: new Date(),
        duracion: 1,
        actividad: 'newActivity',
        descripcion: 'newDescription',
        responsable: 'newResponsible',
        id: 1
      },
      {
        fecha: new Date(),
        duracion: 2,
        actividad: 'newActivity2',
        descripcion: 'newDescription2',
        responsable: 'newResponsible2',
        id: 2
      }
    ]
    const action = {
      type: 'records/updateRecord',
      data: {
        fecha: '2023/07/31',
        duracion: 3,
        actividad: 'UPDATED',
        descripcion: 'UPDATED',
        responsable: 'UPDATED',
        id: 2
      }
    }

    deepFreeze(state)
    const newState = recordReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      fecha: '2023/07/31',
      duracion: 3,
      actividad: 'UPDATED',
      descripcion: 'UPDATED',
      responsable: 'UPDATED',
      id: 2
    })
  })
  // Prueba para la eliminación de registros
  test('returns new state with action DELETE_RECORD', () => {
    const state = [
      {
        fecha: new Date(),
        duracion: 1,
        actividad: 'newActivity',
        descripcion: 'newDescription',
        responsable: 'newResponsible',
        id: 1
      },
      {
        fecha: new Date(),
        duracion: 2,
        actividad: 'newActivity2',
        descripcion: 'newDescription2',
        responsable: 'newResponsible2',
        id: 2
      }
    ]
    const action = {
      type: 'records/deleteRecord',
      data: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = recordReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(state[0])
  })
})