import React from 'react'
import DotEnv from 'dotenv'
import { useNavigate } from 'react-router-dom'
const Logo = () => {
    const navigate = useNavigate()

    const developmentstate = import.meta.env.VITE_STATE
    console.log(developmentstate)
  return (
    <>
    <div onClick={()=>{navigate('/')}} className='fixed top-[25px] left-[20px] p-1.5  rounded-3xl  hover:bg-[var(--color-secondary)]'>
        <img id='logo' src="../../public/logo.png" alt="" className='w-[50px]' />
        
    </div>

    {(developmentstate && developmentstate === "development") && (
          <span className=' break-all fixed top-0 right-0 text-sm'>DEVELOPMENT</span>
        )}
        </>
  )
}

export default Logo