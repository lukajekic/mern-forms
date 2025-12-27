import React from 'react'

export const AppCard = ({children}) => {
  return (
    // Added overflow-hidden to ensure nothing ever pokes out of the rounded corners
    <div className="bg-white rounded-2xl w-full h-[calc(100vh-50px)] shadow-xs p-6 overflow-hidden ">
        {children}
    </div>
  )
}