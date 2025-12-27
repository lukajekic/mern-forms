import React from 'react'

const Tooltip = ({children, value}) => {
  return (
    <div className='tooltip' data-tip={value}>{children}</div>
  )
}

export default Tooltip