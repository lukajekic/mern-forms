import React, { useEffect, useState } from 'react'

import porifleSample from '../assets/profile_sample.jpg'
import { LogOut } from 'lucide-react'
import axios from 'axios'

const AccountDropdown = () => {
  const [userData, setUserData] = useState({})
  const [userIMG, setUserIMG] = useState()


const Logout = async()=>{
  const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/logout`)
  if (response.status === 200) {
    console.log("LOGOUT -- OK")
    location.href = '/login'
  }
}


  useEffect(()=>{

    const getUser = async()=>{
      try {
              const userDataResponse = await axios.get(`${import.meta.env.VITE_BACKEND}/api/user/data`)
if (userDataResponse.status === 200) {
  console.log(userDataResponse.data)
  setUserData(userDataResponse.data)
  setUserIMG(`${import.meta.env.VITE_BACKEND}/api/user/avatar/${userDataResponse.data.profilePicture}`)
  console.log(`${import.meta.env.VITE_BACKEND}/api/user/avatar/${userDataResponse.data.profilePicture}`)
}


      } catch (error) {
        
      }
    }



    getUser()


  }, [])
  return (
    <div>

<details className="dropdown dropdown-top">
  <summary className="btn m-1">My Account</summary>
  <ul className="menu dropdown-content mb-2 bg-base-100 rounded-box z-1 w-70 p-2 shadow-sm">
    
    <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-3 justify-left w-full max-w-full">
            <img src={userIMG} alt="" srcset="" className='h-20 rounded-2xl' />


        <span className='break-normal mt-1 font-bold text-lg'>{userData.name}</span>
        </div>
        

        <button className="btn btn-error w-full text-white" onClick={()=>{Logout()}}><LogOut></LogOut>Log Out</button>


    </div>

    

  </ul>
</details>


    </div>
  )
}

export default AccountDropdown