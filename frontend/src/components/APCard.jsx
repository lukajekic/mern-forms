import React from 'react'

const APCard = ({index, title, type, expandView, onClick}) => {
  return (
     <div onClick={onClick} className={`analytics-picker-card h-fit p-3 rounded-xl bg-gray-100 hover:shadow-md transition-shadow ${expandView ? ('w-full') : ('lg:w-[400px] md:w-[300px] sm:w-[250px] ')}`}>
                        <div className="flex items-center w-full gap-5">
                          <div className="w-fit text-3xl">
                            {index}
                          </div>
    
                          <div className="flex-1">
                            <h1 className='text-lg font-semibold'>{title}</h1>
                        <p className='apc-type'>{type}</p>
                          </div>
                        </div>
                        
                      </div>
  )
}

export default APCard