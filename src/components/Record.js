import React from 'react';



const Record = ({record, handleDelete, handleEdit}) => {
    const deleteClick = (record) => {
        if (window.confirm(`Delete ${record.id}?`)) {
            handleDelete(record.id)
        }
    }
    const editClick = (record) => {
        if (window.confirm(`Edit ${record.id}?`)) {
            handleEdit(record)
        }
    }
    return (
        <tr>
            <td>{record.id}</td>
            <td>{record.fecha}</td>
            <td>{record.duracion}</td>
            <td>{record.actividad}</td>
            <td>{record.descripcion}</td>
            <td>{record.responsable}</td>                  
            <td><button onClick={() => editClick(record)}>edit</button></td>
            <td><button onClick={() => deleteClick(record)}>delete</button></td>
        </tr>
    )
}

export default Record;