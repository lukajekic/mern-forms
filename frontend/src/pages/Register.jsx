import React, { useEffect } from 'react'
import { AppCard } from '../components/AppCard'
import { CircleCheck, LogIn, MessageCircleWarning, Plus, Star } from 'lucide-react'
import YourFormsTable from '../components/YourFormsTable'
import { useNavigate } from 'react-router-dom'
import CreateModal from '../components/CreateModal'
import AccountDropdown from '../components/AccountDropdown'
import porifleSample from '../assets/profile_sample.jpg'
import { useState } from 'react'
import axios from 'axios'


const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errormsg, setErrorMsg] = useState("User Already Exists.")

    const [email, setEmail] = useState("")
        const [password, setpassword] = useState("")
        const [name, setName] = useState("")
        const [avatar, setAvatar] = useState()

        const FormValidation = () =>{
      if (email && password && name) {
        return true
      } else {
        return false
      }
    }

    useEffect(()=>{
      const checkLogin = async() =>{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/checklogin`)

        if (response && response.status === 200) {
          location.href = "/"
        }
      }

      checkLogin()
    }, [])


    const HandleRegister = async()=>{
      setError(false)
      const valid = FormValidation()

      if (valid) {
try {

  const formdata = new FormData()

  formdata.append("name", name)
  formdata.append("email", email)
  formdata.append("password", password)
  formdata.append("avatar", avatar)
  const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register`, formdata)

  if (response && response.status === 201) {
location.href = "/"
  }

  console.log(response)

} catch (error) {
  console.log("error on register", error)

  if (error && error.status === 400) {
    console.log(error.response.data.message)
    setErrorMsg(error.response.data.message)
    setError(true)
  }
}
      } else{
        setErrorMsg("Please enter your Name, Email and Password.")
        setError(true)
      }
    }




  return (
   <div className='w-min-full w-ful w-max-full h-[100vh] flex flex-col justify-center items-center'>
                    <span className='font-bold text-2xl gradient-text-blue fixed top-10 left-22'>MERN Forms</span>

    <div className={`bg-red-700 flex items-center gap-2 rounded-2xl w-111 shadow-xs px-4 py-3 overflow-hidden relative -top-7 ${error === false ? ("hidden") : ("")}`}>
      <MessageCircleWarning className='text-white'></MessageCircleWarning>
      <span className='flex-1 text-white'>{errormsg}</span>
    </div>
   <div className="bg-white rounded-2xl w-fit h-fit shadow-xs mt-2 p-6 overflow-hidden relative -top-7">
        <h1 className="text-2xl font-semibold w-full text-center">Register</h1>
        <div className="h-[1px] w-full bg-[#cecece] mb-2 mt-4"></div>
        


        <fieldset className="fieldset mt-8">
  <legend className="fieldset-legend text-[16px]">Full Name</legend>
  <input type="text" className="input w-100" placeholder="" value={name} onChange={(e)=>{setName(e.target.value)}} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend text-[16px]">Email</legend>
  <input type="text" className="input w-100" placeholder="" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend text-[16px]">Password</legend>
  <input type="password" className="input w-100" placeholder="" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend text-[16px]">Avatar</legend>
  <input type="file" className="file-input w-100" placeholder="" onChange={(e)=>{setAvatar(e.target.files[0])}} />
</fieldset>


<div className="w-full flex gap-2 mt-3">
  <button className="btn flex-1"><CircleCheck/>Login</button>
  <button className="btn btn-primary flex-1" onClick={()=>{HandleRegister()}}><LogIn/>Register</button>
</div>



    </div>
    </div>
  )
}

export default Register