import React, { useState, useEffect } from 'react'
import { AppCard } from '../components/AppCard'
import { Plus, Star } from 'lucide-react'
import YourFormsTable from '../components/YourFormsTable'
import { useNavigate } from 'react-router-dom'
import CreateModal from '../components/CreateModal'
import AccountDropdown from '../components/AccountDropdown'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate()
  const [forms, setForms] = useState([])

  useEffect(() => {
    const getForms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/form/`)
        console.log(response)
        setForms(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getForms()
  }, [])

  return (
    <>
      <AppCard>
        <CreateModal />

        <div className="flex flex-row gap-[35px] w-full h-full">

          {/* Sidebar */}
          <div className="flex flex-col justify-between h-full w-[20%]">
            <div className="flex flex-col gap-3">
              <span className='font-bold text-2xl gradient-text-blue'>MERN Forms</span>

              <button 
                className="btn btn-primary" 
                onClick={() => document.getElementById('create').showModal()}>
                <Plus /> Create new
              </button>

              <button 
                onClick={() => navigate('/favourite')} 
                className="btn btn-secondary">
                <Star /> Favourite forms
              </button>
            </div>

            <AccountDropdown />
          </div>

          {/* Right side */}
          <div className="h-full w-[calc(80%-35px)] text-xl flex flex-col gap-3">
            <span className='text-[var(--color-primary-content)]/70'>Your Forms</span>
            <YourFormsTable forms={forms} />
          </div>

        </div>
      </AppCard>
    </>
  )
}

export default Home
