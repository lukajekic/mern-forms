import { EllipsisVertical } from 'lucide-react'
import React from 'react'

const IRCard = ({ index, title, subtitle, expandView, onClick, openRIGHT }) => {
  return (
    <div
      onClick={onClick}
      className={`analytics-picker-card h-fit p-3 rounded-xl bg-gray-100 hover:shadow-md transition-shadow max-w-[300px] ${expandView ? 'w-full' : 'lg:w-[400px] md:w-[300px] sm:w-[250px]'}`}
    >
      <div className="flex items-center w-full gap-5">
        <div className="w-fit text-3xl">{index}</div>

        <div className="flex-1 min-w-0">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div
        className="dropdown"
        onClick={(e) => e.stopPropagation()} 
      >
        <div
          tabIndex={0}
          role="button"
          className={`btn m-1 relative top-0 ${expandView ? '' : 'hidden'}`}
        >
          <EllipsisVertical />
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-35 p-2 shadow-sm"
        >
          <li onClick={openRIGHT} className='w-fit'>
            <a className='w-fit'>Open in Right View</a>
          </li>
        </ul>
      </div>
          </div>
          

          <p className="apc-type w-full truncate">{subtitle}</p>
        </div>
      </div>

      
    </div>
  )
}

export default IRCard
