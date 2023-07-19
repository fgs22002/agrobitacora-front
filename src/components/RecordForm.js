import React from 'react';

const RecordForm = ({h2_text, button_text, newDate, newDuration, newActivity, newDescription, newResponsible, handleDateChange, handleDurationChange, handleActivityChange, handleDescriptionChange, handleResponsibleChange, handleAddRecord, handleCancelEdit}) => (
  <>
    <h2>{h2_text}</h2>
    <form>
    <div>
      Date: <input 
              type="date"
              value={newDate}
              onChange={handleDateChange}
            />
    </div>
    <div>
      Duration: <input 
              value={newDuration}
              onChange={handleDurationChange}
            />
    </div>
    <div>
      Activity: <input 
              value={newActivity}
              onChange={handleActivityChange}
            />
    </div>
    <div>
      Description: <input 
              value={newDescription}
              onChange={handleDescriptionChange}
            />
    </div>
    <div>
      Responsible: <input 
              value={newResponsible}
              onChange={handleResponsibleChange}
            />
    </div>
    <div>
      <button type="submit" onClick={handleAddRecord}>{button_text}</button>
      {handleCancelEdit ? <button onClick={() => handleCancelEdit()}>cancel</button>:<></>}
    </div>

  </form>
  </>
)

export default RecordForm;