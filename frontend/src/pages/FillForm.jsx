import {CircleAlert, CircleIcon, Eraser, Send, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import answersent from '../assets/answersent.png'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LoadingModal from '../components/LoadingModal'
import { Text, Mail, Lock, Equal, Calendar, Clock, SquareCheck, Link, Calculator } from 'lucide-react'
const FillForm = () => {
  const [submit, setSubmit] = useState(false)
  const [fields, setFields] = useState([])
  const [formDetails, setFormDetails] = useState({})
const {id} = useParams()



const iconMap = {
  text: Text,
  email: Mail,
  password: Lock,
  number: Calculator,
  date: Calendar,
  time: Clock,
  url: Link
}

const initializeForm = async ()=>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/form/fields/${id}`)
    if (response.status === 200) {
      setFields(response.data.fields)
      setFormDetails({
        title: response.data.title,
        owner: response.data.owner.name
      })
    } else {
      console.log("ERR OCCURED")
    }
  } catch (error) {
    console.log("ERR OCCURED")
    console.error(error)
  }
}

useEffect(()=>{
  initializeForm()

/* 
  setTimeout(() => {
        document.getElementById('loading').showModal()

  }, 1200); */
}, [])

  // inicijalizacija answers preko forEach
  const initialAnswers = {}
  fields.forEach(f => {
    initialAnswers[f.id] = f.type === "checkbox" ? false : null
  })

  const [answers, setAnswers] = useState(initialAnswers)

  // univerzalni handler za sve tipove inputa
  const handleChange = (id, type, e) => {
    setAnswers(prev => ({
      ...prev,
      [id]: type === "checkbox" ? e.target.checked : type === 'number' ? Number(e.target.value) : e.target.value
    }))
  }

  const handleClear = () => {
    const cleared = {}
    fields.forEach(f => {
      cleared[f.id] = f.type === "checkbox" ? false : ""
    })
    setAnswers(cleared)
  }

  const handleSubmit = async(e) => {   
    const form = document.getElementById('survey')
    e.preventDefault()
    if (!form.checkValidity()) {
      form.reportValidity()
    }  else {
 document.getElementById('loading').showModal()

    console.log("All answers:", answers)

    try {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/response`, {
values: answers,
form: id
})

if (response.status === 201) {
  setTimeout(() => {
    document.getElementById('loading').close()
    setSubmit(true)
  }, 1250);
}
} catch (error) {
  console.log(error)
  document.getElementById('loading').close()

    document.getElementById('errormodal').showModal()

}


    }
   


  }

  return (
    <div className='w-full bg-white max-w-[1000px] m-auto rounded-lg p-4'>
      <LoadingModal></LoadingModal>
      {!submit ? (
        <>
          <div className="w-full border-b pb-2">
            <h1 className='font-bold text-lg line-clamp-1'>{formDetails.title}</h1>
            <p className='mt-2 inline-flex items-center flex-1 text-black/50'><User className='w-[25px] min-w-[25px] max-w-[25px]' />{formDetails.owner}</p>
          </div>

          <form id='survey' onSubmit={handleSubmit}>

            <div className="flex flex-col gap-4 mt-5 border-b pb-5">
            {fields.map(field => {
              const ICON = iconMap[field.type]
              return (
<div key={field.id} className='flex flex-col gap-1 w-full sm:w-[50%]'>
                <label className="fieldset-legend inline">{field.label}{field.required ? (<span className='text-red-500'>*</span>):("")}</label>
                <div className="w-full flex items-center gap-2">
                                  {ICON && <ICON className='text-black/50'></ICON>}

                  <input
                  type={field.type}
                  required={field.required}
                  className={field.type === "checkbox" ? "checkbox" : "input w-full"}
                  checked={field.type === "checkbox" ? answers[field.id] : undefined}
                  value={field.type !== "checkbox" ? answers[field.id] : undefined}
                  onChange={(e) => handleChange(field.id, field.type, e)}
                />
                </div>
                {!field.required && <span className="text-xs text-black/40">Opciono</span>}
              </div>
              )
              
            })}
          </div>

          <div className="w-full flex gap-2 justify-between mt-4">
            <button className="btn btn-error text-white" onClick={handleClear}><Eraser /> Clear Answers</button>
            <button className="btn btn-primary" type='submit'>Submit <Send /></button>
          </div>


          </form>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full">
          <img src={answersent} alt="" className='h-[75px] w-[75px]' />
          <h1 className="font-bold text-2xl text-center">Your answers are sent!</h1>
        </div>
      )}







      {/* ERROR MODAL */}
<dialog id="errormodal" className="modal">
  <div className="modal-box">
    <span className='inline-flex items-center gap-3'>
      <CircleAlert className='text-red-700'></CircleAlert>
      <h3 className="font-bold text-lg text-red-700">Error occured!</h3>
    </span>
    <p className="py-4">Check your internet connection, or try again later.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      {/* ERROR MODAL END */}
    </div>
  )
}

export default FillForm
