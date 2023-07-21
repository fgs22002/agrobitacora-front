import React, { useState } from 'react'

const RecordForm = ({ isEdit, addRecord, cancelEdit }) => {
  //Estado
  const [ newDate, setNewDate ] = useState(new Date())
  const [ newDuration, setNewDuration ] = useState(0)
  const [ newActivity, setNewActivity ] = useState('')
  const [ newDescription, setNewDescription ] = useState('')
  const [ newResponsible, setNewResponsible ] = useState('')
  const [ edit, setEdit] = useState(isEdit)

  if (edit !== isEdit) {
    setEdit(isEdit)
    if (isEdit) {
      setNewDate(isEdit.fecha)
      setNewDuration(isEdit.duracion)
      setNewActivity(isEdit.actividad)
      setNewDescription(isEdit.descripcion)
      setNewResponsible(isEdit.responsable)
    }
  }
  /*
    useEffect(()=>{
      if (isEdit) {
        setNewDate(isEdit.fecha)
        setNewDuration(isEdit.duracion)
        setNewActivity(isEdit.actividad)
        setNewDescription(isEdit.descripcion)
        setNewResponsible(isEdit.responsable)
      }
    },[isEdit])
    */

  //Handles
  const handleDateChange = (event) => {
    setNewDate(event.target.value)
  }
  const handleDurationChange = (event) => {
    setNewDuration(event.target.value)
  }
  const handleActivityChange = (event) => {
    setNewActivity(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }
  const handleResponsibleChange = (event) => {
    setNewResponsible(event.target.value)
  }
  const handleCancelEdit = () => {
    setNewDate(new Date())
    setNewDuration(0)
    setNewActivity('')
    setNewDescription('')
    setNewResponsible('')
    cancelEdit()
  }

  const handleAddRecord = (event) => {
    event.preventDefault()

    addRecord({
      fecha: newDate,
      duracion: newDuration,
      actividad: newActivity,
      descripcion: newDescription,
      responsable: newResponsible,
    })
    setNewDate(new Date())
    setNewDuration(0)
    setNewActivity('')
    setNewDescription('')
    setNewResponsible('')
  }

  return (
    <>
      <h2>{isEdit?'Edit record':'Add a new record'}</h2>
      <form onSubmit={handleAddRecord}>
        <div>
            Date: <input
            type="date"
            value={newDate}
            onChange={handleDateChange} />
        </div>
        <div>
            Duration: <input
            value={newDuration}
            onChange={handleDurationChange} />
        </div>
        <div>
            Activity: <input
            value={newActivity}
            onChange={handleActivityChange} />
        </div>
        <div>
            Description: <textarea
            value={newDescription}
            onChange={handleDescriptionChange} />
        </div>
        <div>
            Responsible: <input
            value={newResponsible}
            onChange={handleResponsibleChange} />
        </div>
        <div>
          <button type="submit">{isEdit?'save':'add'}</button>
          {isEdit ? <button onClick={() => handleCancelEdit()}>cancel</button> : <></>}
        </div>

      </form>
    </>
  )
}

export default RecordForm