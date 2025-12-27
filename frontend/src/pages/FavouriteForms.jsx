import React from 'react'
import { AppCard } from '../components/AppCard'
import { Plus, Star } from 'lucide-react'
import YourFormsTable from '../components/YourFormsTable'
import CreateModal from '../components/CreateModal'
import AccountDropdown from '../components/AccountDropdown'

const FavouriteForms = () => {
  return (
    <>
    <AppCard>
      <CreateModal></CreateModal>
        <div className="flex flex-row gap-[35px] w-full h-full">
            <div className="flex flex-col justify-between h-full w-[20%]">
                <div className=" flex flex-col gap-3">
                <span className='font-bold text-2xl gradient-text-blue'>MERN Forms</span>
                <button className="btn btn-primary" onClick={()=>{document.getElementById('create').showModal()}}><Plus/>Create new</button>
{/*                 <button className="btn btn-secondary"><Star/>Favourite forms</button>
 */}            
 
 </div>


  <AccountDropdown></AccountDropdown>
            </div>
            
                        <div className="h-full w-[calc(80%-35px)]  text-xl flex flex-col gap-3">
                            <span className='flex flex-row inline-flex items-center gap-2 text-[var(--color-primary-content)]/70'><Star className='size-5' fill='currentColor'/><span>Favourite Forms</span></span>
                                                    <YourFormsTable></YourFormsTable>

                        </div>

        </div>
    </AppCard>
    </>
  )
}

export default FavouriteForms