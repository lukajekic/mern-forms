import React from 'react'
import {v4 as uuidv4} from 'uuid'
const FieldTypePicker = ({icon, label, type, onUpdate}) => {
  return (
    <a href="#">
      <div onClick={()=>{onUpdate({id: uuidv4(), type: type, required: true, label:  `${type} ` })}}>

        <div className="bg-[var(--color-secondary)]/50 h-5 flex gap-2 items-center h-auto p-2 rounded-2xl">
                  <div className="badge badge-primary py-4">{icon}</div>
                  <div>{label}</div>
                  </div>
    </div>
    </a>
    
  )
}

export default FieldTypePicker